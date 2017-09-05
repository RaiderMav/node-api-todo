const {mongoose} = require('./../server/db/mongoose'),
  {Todo} = require('./../server/models/todo'),
  {ObjectID} = require('mongodb'),
  {User} = require('./../server/models/user')

// Todo.remove({}).then((res) => {
//   console.log(res)
// })

Todo.findOneAndRemove({
  text: 'Eat some Sausage'
}).then((todo) => {
  console.log(todo)
})

// Todo.findByIdAndRemove('59ac9087d121264daad352f9').then((todo) => {
//   console.log(todo)
// })

