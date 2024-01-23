const { Schema, model } = require('mongoose')
const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  pass: {
    type: String,
    required: [true, 'La clave es obligatorio']
  },
  status: {
    type: Boolean,
    default: true
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, clave, ...user } = this.toObject()
  return user
}

module.exports = model('User', UserSchema)
