const express = require('express')
const app = express()
const port = 3000


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

//設置環境變數
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

//設置快閃訊息
const flash = require('connect-flash')
const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

//message-middleware
const messageHandler = require('./middleware/message-handler')
app.use(messageHandler)

//重製router
const router = require('./routers')
app.use(router)

//error-handler
const errorHandler = require('./middleware/error-handler')
app.use(errorHandler)




app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})