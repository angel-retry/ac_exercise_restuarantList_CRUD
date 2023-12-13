const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

//使用FB登入
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successRedirect: '/lists',
  failureRedirect: '/login',
  failureFlash: true
}))


module.exports = router