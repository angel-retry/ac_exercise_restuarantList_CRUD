const express = require('express')
const router = express.Router()

const authHandler = require('../middleware/auth-handler')

const lists = require('./lists')
const oauth = require('./oauth')
const root = require('./root')
const user = require('./user')

//首頁
router.get('/', (req, res) => {
  res.redirect('/login')
})

router.use('/lists', authHandler, lists)
router.use('/', user)
router.use('/', oauth)
router.use('/', root)

module.exports = router