const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../../models/index')
const User = db.User

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login request
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register request
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        errors.push({ message: '這個email已經註冊過了。' })
        return res.render('register', { name, email, password, confirmPassword })
      }

      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。') // store success_msg: .... to req.flash
  res.redirect('/users/login')
})

module.exports = router