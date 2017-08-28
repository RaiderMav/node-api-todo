const mongoose = require('mongoose'),
  User = mongoose.model(`User`, {
    email: {
      type: String,
      minLength: 1,
      trim: true,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Number,
      default: null
    }
  })
module.exports = {User}
