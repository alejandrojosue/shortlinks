const { Router } = require('express')
const { check } = require('express-validator')
const { singin } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')
const router = Router()

router.post('/auth/login/', [
  check('email', 'Email is required').isEmail(),
  check('pass', 'Password is required').not().isEmpty(),
  validateFields
], singin)

module.exports = router
