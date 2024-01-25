const { validationResult } = require('express-validator')

const validateFields = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    if (errors.array().some(({ msg }, index) => msg.includes('already exists') && index === 0)) {
      return res.status(409).json(errors)
    }
    return res.status(400).json(errors)
  }
  next()
}

module.exports = {
  validateFields
}
