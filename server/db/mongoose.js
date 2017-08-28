const mongoose = require('mongoose')

var promise = mongoose.connect(`mongodb://localhost:27017/TodoApp`, {
  useMongoClient: true
})

// mongoose.Promise = global.Promise
// mongoose.connect(`mongodb://localhost:27017/TodoApp`)

module.exports = {mongoose}
