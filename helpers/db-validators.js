const User = require('../models/user')

const emailExist = async (correo = '') => {
  const existEmail = await User.findOne({ correo })
  if (existEmail) {
    throw new Error(`The email: ${correo} already exists in the database`)
  }
}

const userIdExist = async (id) => {
  const idExist = await User.findById(id)
  if (!idExist) {
    throw new Error(`user id: ${id} not exists`)
  }
}

module.exports = {
  emailExist,
  userIdExist
}
