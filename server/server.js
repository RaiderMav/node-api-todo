const express = require('express'),
  bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose'),
  {Todo} = require('./models/todo'),
  {User} = require('./models/user')

const app = express(),
  PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    completed: req.body.completed
  })
  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
