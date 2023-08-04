const express = require('express')
const app = express()
const port = 3000


//設置model
const db = require('./models')
const List = db.List

//設置express-handlebars
const { engine } = require('express-handlebars')
app.engine('.hbs', engine({ extname: '.hbs' })) //新增引擎樣板hbs，extname為預設的檔名
app.set('view engine', '.hbs') //開始啟用hbs樣板
app.set('views', './views') //指定views資料夾為指定的位置

//載入靜態資料
app.use(express.static('public'))
app.use(express.static('utilities'))

//可取得表單單純資料
app.use(express.urlencoded({ extended: true }))

//設置method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.redirect('/lists')
})

//取得全餐廳清單
app.get('/lists', (req, res) => {
  return List.findAll({
    attributes: ['id', 'image', 'name', 'category', 'rating'],
    raw: true
  })
    .then((lists) => res.render('lists', { lists }))
    .catch((err) => res.status(422).json(err))
})

//取得新增清單頁
app.get('/lists/new', (req, res) => {
  res.render('new')
})

//新增一家餐聽
app.post('/lists', (req, res) => {
  const alertMessage = "新增成功! 請至首頁查看。"
  const data = req.body
  return List.create({
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    image: data.image,
    location: data.location,
    phone: data.phone,
    google_map: data.google_map,
    rating: data.rating,
    description: data.description,
  })
    .then(() => res.render('new', { alertMessage }))
    .catch((err) => console.log(err))
})

//取得一家餐廳頁面
app.get('/lists/:id', (req, res) => {
  const id = req.params.id
  return List.findByPk(id, {
    attributes: ['id', 'name', 'category', 'location', 'phone', 'description', 'image', 'rating'],
    raw: true
  })
    .then((list) => res.render('list', { list }))
    .catch((err) => console.log(err))
})

//取得修改一家餐廳頁面
app.get('/lists/:id/edit', (req, res) => {
  res.send(`updating list page: ${req.params.id}`)
})

//修改一家餐廳頁面內容
app.put('/todos', (req, res) => {
  res.send(`updating list ${req.params.id}`)
})

//刪除一家資訊
app.delete('/lists/:id', (req, res) => {
  const id = req.params.id
  return List.destroy({
    where: {
      id
    }
  })
    .then(() => res.redirect('/lists'))
    .catch((err) => console.log(err))
})



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})