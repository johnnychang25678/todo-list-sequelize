const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../../models/index')
const User = db.User

// login page
router.get('/users/login', (req, res) => {
  res.render('login')
})

// login request
router.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register page
router.get('/users/register', (req, res) => {
  res.render('register')
})

// register request
router.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
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
router.get('/users/logout', (req, res) => {
  res.send('logout')
})

module.exports = router