
const expect = require('expect'),
  request = require('supertest'),
  { ObjectID } = require('mongodb'),
  { app } = require('./../server'),
  { Todo } = require('./../models/todo'),

  todos = [{
    _id: new ObjectID(),
    text: 'First test todo'

  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('POST /todos', () => {
  it(`should create a new todo`, (done) => {
    let text = `test todo text`

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => done(e))
      })
  })
  it(`should not create todo with invalid body data`, (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('GET /todos', () => {
  it(`should get all todos`, (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe(`GET /todos/:id`, () => {
  it(`should return todo doc`, (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })
  it(`should return a 404 if todo not found`, (done) => {
    let hexId = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })
  it(`should return a 404 for non-object id`, (done) => {
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it(`should remove a todo`, (done) => {
    let hexId = todos[1]._id.toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        // query database using findById
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist()
          done()
        }).catch((e) => done(e))
      })
  })
  it(`should return 404 if todo not found`, (done) => {
    let hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })
  it(`should return 404 if object id is invalid`, (done) => {
    let hexId = '123abc'
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })
})

describe(`PATCH /todos/:id`, () => {
  it(`should update a todo`, (done) => {
    // grab id of first item
    let id = todos[0]._id.toHexString()
    let text = 'This is updated text'

    request(app)
    .patch(`/todos/${id}`)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(true)
      expect(res.body.todo.completedAt).toBeA('number')
      expect(res.body.todo.text).toBe(text)
    })
.end(done)
  })

    // 200
    // assert text is changed, completed is true, completedAt is a number .toBeA()

  it(`should clear completedAt when todo is not completed`, (done) => {
    // grab id of second todo item
    // update text, set completed to false
    // 200
    // text is changed, completed false, completedAt is null .toNotExist()
    let hexId = todos[1]._id.toHexString()
    let text = 'New and improved text'

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: false,
      text
    })
.expect(200)
.expect((res) => {
  expect(res.body.todo.completed).toBe(false)
  expect(res.body.todo.completedAt).toNotExist()
  expect(res.body.todo.text).toBe(text)
})
.end(done)
  })
})
