const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({ msg: 'There is no token.' })
  }
  try {
    const { uid } = jwt.verify(token, process.env.PUBLIC_SECRET_KEY)
    const userAuthenticated = await User.findById(uid)

    if (!userAuthenticated) {
      return res.status(401).json({
        msg: 'Token not valid'
      })
    }

    if (!userAuthenticated.status) {
      return res.status(401).json({
        msg: 'Token not valid'
      })
    }
    req.userAuthenticated = userAuthenticated
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'token is not valid.' })
  }
}

module.exports = { validateJWT }
