const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

const db = require('../models')
const User = db.User

const bcryptjs = require('bcryptjs')

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

module.exports = passport