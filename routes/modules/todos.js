const express = require('express')
const router = express.Router()

const db = require('../../models/index')
const Todo = db.Todo

// form to submit new todo
router.get('/new', (req, res) => {
  res.render('new')
})

// create todo
router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})


// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id

  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.error(error))
})

// view edit todo page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => {
      console.log(todo)
      return res.render('edit', { todo: todo.toJSON() })
    })
    .catch(err => console.error(err))
})

// edit todo
router.put('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  const { name, isDone } = req.body

  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.error(err))
})

// delete todo
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router