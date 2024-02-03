const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const generateJWT = require('../helpers/generate-jwt')

const singin = async (req = request, res = response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Sign In User'

  const { email, pass } = req.body
  try {
    // is email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'user/password is not correct'
      })
    }
    // is status = active
    if (!user.status) {
      return res.status(400).json({
        msg: 'user/password is not correct'
      })
    }
    // validate password
    const validPass = bcryptjs.compareSync(pass, user.pass)

    if (!validPass) {
      return res.status(400).json({
        msg: 'user/password is not correct'
      })
    }
    // generate JWT
    const token = await generateJWT(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    return res.status(500).json({
      msg: 'Server Internal Error'
    })
  }
}

const singup = (req = request, res = response) => {
  return res.status(200).json({})
}

module.exports = { singin, singup }
