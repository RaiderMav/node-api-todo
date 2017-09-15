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
      }, process.env.JWT_SECRET).toString()
    }]
  }, {
    _id: userTwoId,
    email: 'billy@example.com',
    password: 'userTwoPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userTwoId.toHexString(),
        access: 'auth'
      }, process.env.JWT_SECRET).toString()
    }]
  }],

  todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
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
