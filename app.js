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

//重製router
const router = require('./routers')
app.use(router)


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})