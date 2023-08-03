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

app.get('/', (req, res) => {
  res.render('index')
})

//取得全餐廳清單
app.get('/lists', (req, res) => {
  res.send("get all lists")
})

//取得新增清單頁
app.get('/lists/new', (req, res) => {
  res.send("create new list page")
})

//新增一家餐聽
app.post('/lists', (req, res) => {
  res.send("create new list")
})

//取得一家餐廳頁面
app.get('/lists/:id', (req, res) => {
  res.send(`here is list:${req.params.id}`)
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
app.delete('/todos', (req, res) => {
  res.send('delete list.')
})



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})