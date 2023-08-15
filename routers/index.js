const express = require('express')
const router = express.Router()

const lists = require('./lists')

router.use('/lists', lists)

router.get('/', (req, res) => {
  res.redirect('/lists')
})

module.exports = router