const { Schema, model } = require('mongoose')
const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  pass: {
    type: String,
    required: [true, 'password is required']
  },
  status: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  update_at: {
    type: Date,
    default: new Date()
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, pass, ...user } = this.toObject()
  return user
}

module.exports = model('User', UserSchema)
