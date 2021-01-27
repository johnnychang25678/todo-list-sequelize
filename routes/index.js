const express = require('express')
const router = express.Router()
const authenticator = require('../middlewares/auth')


router.use('/users', require('./modules/users'))
router.use('/auth', require('./modules/auth'))
router.use('/todos', authenticator, require('./modules/todos'))
router.use('/', authenticator, require('./modules/home'))

module.exports = router