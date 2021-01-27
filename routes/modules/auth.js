const express = require('express')
const router = express.Router()

const passport = require('passport')

// when user clicks login with facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile'] // the data we asked from facebook
}))

// callback route is when user clicks agree
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

module.exports = router