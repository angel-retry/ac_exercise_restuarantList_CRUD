const express = require('express')
const router = express.Router()

const bcryptjs = require('bcryptjs')

const db = require('../models')
const User = db.User

//註冊帳號，新增用戶
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

module.exports = router