const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { rest } = require('../config/api')

const usersGet = async (req = request, res = response) => {
  const { defaultLimit, maxLimit } = rest
  const { limit = defaultLimit, from = 0 } = req.query
  const userStatus = { status: true }
  const [usersCount, users] = await Promise.all([
    User.countDocuments(userStatus),
    User.find(userStatus)
      .skip(Number(from))
      .limit(parseInt(limit > maxLimit ? maxLimit : limit))
  ])

  res.json({
    count: usersCount,
    users
  })
}

const usersPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, pass, correo, ..._r } = req.body
  // Validar contra BD
  if (pass) {
    // Encriptar pass
    const salt = bcryptjs.genSaltSync()
    _r.pass = bcryptjs.hashSync(pass, salt)
  }

  const user = await User.findByIdAndUpdate(id, _r)

  res.json({
    // msg: 'Put API - Controlador',
    user
  })
}

const usersPost = async (req, res = response) => {
  const { name, email, pass } = req.body
  const user = new User({ name, email, pass })

  // Encriptar clave
  const salt = bcryptjs.genSaltSync()
  user.clave = bcryptjs.hashSync(pass, salt)

  await user.save()
  res.json({
    user
  })
}

const usersDelete = async (req, res = response) => {
  const { id } = req.params

  // borrar registro
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json(user)
}

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'Path API - Controlador'
  })
}

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch
}
