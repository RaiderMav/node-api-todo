const {SHA256} = require('crypto-js'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs')

let password = '123abc'

// bcrypt.genSalt(12, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash)
//   })
// })

let hashedPassword = '$2a$12$W8LRMVvmtZWAl/j5F0o4perYt7CAgp2RKWbgz1k4aHQYqkN1Tbfi2'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// let data = {
//   id: 10
// }

// let token = jwt.sign(data, password)
// console.log(token)

// let decoded = jwt.verify(token, password)
// console.log('decoded', decoded)
// let message = `I am user number 3`
// let hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// let data = {
//   id: 4
// }

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + `somesecret`).toString()
// }

// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// let resultHash = SHA256(JSON.stringify(token.data) + `somesecret`).toString()

// if (resultHash === token.hash) {
//   console.log(`Data was not changed`)
// } else {
//   console.log(`Data was changed. Do not trust`)
// }
