const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

//登入頁
router.get('/login', (req, res) => {
  console.log('seesion', req.session)
  console.log(req.user)
  res.render('login')
})

//註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

//登入系統
router.post('/login', passport.authenticate('local', {
  successRedirect: '/lists',
  failureRedirect: '/login',
  failureFlash: true
}))

//登出系統
router.post('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }

    return res.redirect('/login')
  })
})

module.exports = router