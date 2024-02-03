const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { userIdExist, titleValidate, urlValidate, titleExist, linkIdExist } = require('../helpers/db-validators')

const {
  linksGet,
  linkGetById,
  linksPost,
  linksPut,
  linksDelete,
  linksGetByUser
} = require('../controllers/links')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.get('/links/', linksGet)

router.get('/links/:id', [
  check('id', 'id is not valid').isMongoId(),
  validateFields
], linkGetById)

router.get('/links/user/:userId', [
  validateJWT,
  check('userId', 'id is not valid').isMongoId(),
  validateFields
], linksGetByUser)

router.post('/links/', [
  check('title', 'title is required').not().isEmpty(),
  check('title').custom(titleValidate),
  check('title').custom(titleExist),
  check('url', 'url is required').not().isEmpty(),
  check('url').custom(urlValidate),
  check('userId', 'id is not valid').isMongoId(),
  check('userId', 'userId is required').not().isEmpty(),
  check('userId').custom(userIdExist),
  validateFields
], linksPost)

router.put('/links/:id', [
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(linkIdExist),
  check('title').custom(titleValidate),
  check('title').custom(titleExist),
  check('url').custom(urlValidate),
  validateFields
], linksPut)

router.delete('/links/:id', [
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(linkIdExist),
  validateFields
], linksDelete)

module.exports = router
