const { Todo } = require('./../../models/todo'),
  { ObjectID } = require('mongodb'),
  {User} = require('./../../models/user'),
  jwt = require('jsonwebtoken'),
  userOneId = new ObjectID(),
  userTwoId = new ObjectID(),

  users = [{
    _id: userOneId,
    email: 'william@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userOneId.toHexString(),
        access: 'auth'
      }, 'abc123').toString()
    }]
  }, {
    _id: userTwoId,
    email: 'billy@example.com',
    password: 'userTwoPass'
  }],

  todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }],

  populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos)
    }).then(() => done())
  },

  populateUsers = (done) => {
    User.remove({}).then(() => {
      let userOne = new User(users[0]).save()
      let userTwo = new User(users[1]).save()

      return Promise.all([userOne, userTwo])
    }).then(() => done())
  }

module.exports = { todos, populateTodos, users, populateUsers }