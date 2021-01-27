const express = require('express')
const router = express.Router()
const db = require('../../models/index')
const Todo = db.Todo

router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then(todos => res.render('index', { todos }))
    .catch(err => res.status(422).json(err))
})

module.exports = router