const express = require('express')
const router = express.Router()

const lists = require('./lists')

const db = require('../models')
const User = db.User

const bcryptjs = require('bcryptjs')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

const authHandler = require('../middleware/auth-handler')

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'password', 'email'],
    where: { email: username },
    raw: true
  })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: '電子信箱或密碼輸入錯誤!' })
      }
      return bcryptjs.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: '電子信箱或密碼輸入錯誤!' })
          }
          return done(null, user)
        })
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })
}))

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value
  const name = profile.displayName

  return User.findOne({
    attributes: ['id', 'email', 'name'],
    where: { email },
    raw: true
  })
    .then((user) => {
      if (user) {
        return done(null, user)
      }

      const randomPwd = Math.random().toString(36).slice(-8)

      return bcryptjs.hash(randomPwd, 10)
        .then((hash) => {
          return User.create({ name, email, password: hash })
        })
        .then((user) => {
          done(null, { id: user.id, name: user.name, email: user.email })
        })
    })
    .catch((error) => {
      error.errorMessage = '登入失敗!'
      return done(error)
    })

}))

passport.serializeUser((user, done) => {
  const { id, name, password } = user
  return done(null, { id, name, password })
})

passport.deserializeUser((user, done) => {
  done(null, { id: user.id })
})

router.use('/lists', authHandler, lists)

router.get('/', (req, res) => {
  res.redirect('/lists')
})

router.get('/login', (req, res) => {
  console.log('seesion', req.session)
  console.log(req.user)
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (!name) {
    req.flash('error', '請填入名字!')
    return res.redirect('back')
  }

  if (!email || !password) {
    req.flash('error', '請填入信箱和密碼!')
    return res.redirect('back')
  }

  if (password != confirmPassword) {
    req.flash('error', '密碼與確認密碼不符喔!')
    return res.redirect('back')
  }

  return User.count({ where: { email } })
    .then((rowCount) => {
      if (rowCount) {
        req.flash('error', '此信箱已經註冊過囉!請前往登入頁!')
        return res.redirect('back')
      }

      return bcryptjs.hash(password, 10)
        .then((hashPassword) => {
          return User.create({ name, email, password: hashPassword })
            .then((user) => {
              if (!user) {
                return res.redirect('back')
              }
              req.flash('success', '註冊成功!')
              res.redirect('/login')
            })
        })
    })
})

router.get('/login', passport.authenticate('local', {
  successRedirect: '/lists',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successRedirect: '/lists',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }

    return res.redirect('/login')
  })
})


module.exports = router