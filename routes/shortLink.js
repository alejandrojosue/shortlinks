const { Router } = require('express')
const { shortLink } = require('../controllers/shortLink')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.get('/:title', [
  check('title', 'title is required').not().isEmpty(),
  validateFields
], shortLink)

module.exports = router
