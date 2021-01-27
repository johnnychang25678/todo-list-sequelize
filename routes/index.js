const express = require('express')
const router = express.Router()


router.use('/users', require('./modules/users'))
router.use('/todos', require('./modules/todos'))
router.use('/', require('./modules/home'))

module.exports = router