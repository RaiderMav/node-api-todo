const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect to MongoDB server`)
  }
  console.log(`Connected to MongoDB server`)

  // db.collection(`Todos`).findOneAndUpdate({
  //   _id: new ObjectID('59a2cae154d4c9b7760d543d')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // })

  db.collection(`Users`).findOneAndUpdate({
    _id: new ObjectID('59a2f2c054d4c9b7760d5d89')
  }, {
    $set: {
      name: 'Mat Myrick'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2))
  })
  // db.close()
})
