const {mongoose} = require('./../server/db/mongoose'),
  {Todo} = require('./../server/models/todo'),
  {ObjectID} = require('mongodb'),
  {User} = require('./../server/models/user')

// let id = '59ab324cd121264daad31700'

// let id = '69a5dc1faaaa894ba725b66a'
// if (!ObjectID.isValid(id)) {
//   console.log(`ID not valid`)
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log(`Todos`, todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(`Todo`, todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log(`Id not found`)
//   }
//   console.log(`Todo By Id`, todo)
// }).catch((e) => console.log(e))

User.findById('69ab324cd121264daad31700').then((user) => {
  if (!user) {
    return console.log(`User not found`)
  }
  console.log(JSON.stringify(user, undefined, 2))
}).catch((e) => console.log(e))
