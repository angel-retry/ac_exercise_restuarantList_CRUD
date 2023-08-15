const express = require('express')
const router = express.Router()

const lists = require('./lists')

const db = require('../models')
const List = db.List


router.use('/lists', lists)

router.get('/', (req, res) => {
  res.redirect('/lists')
})




module.exports = router