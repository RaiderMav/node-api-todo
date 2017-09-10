const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  validator = require('validator'),
  _ = require('lodash')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 1,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `${this.email} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
  var user = this
  var access = 'auth'
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc123').toString()

  user.tokens.push({
    access,
    token
  })

  return user.save().then(() => {
    return token
  })
}

UserSchema.statics.findByToken = function (token) {
  let User = this
  let decoded

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    return Promise.reject()
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

var User = mongoose.model('User', UserSchema)

module.exports = { User }
