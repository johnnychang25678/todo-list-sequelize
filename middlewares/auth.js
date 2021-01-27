module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('warning_msg', '請先登入才能使用!') // store message in flash()
  res.redirect('/users/login')
}
