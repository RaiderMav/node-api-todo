const mongoose = require('mongoose')

let promise = mongoose.connect(process.env.MONGODB_URI  {
  useMongoClient: true
})

// mongoose.Promise = global.Promise
// mongoose.connect(`mongodb://localhost:27017/TodoApp`)

module.exports = {mongoose}

