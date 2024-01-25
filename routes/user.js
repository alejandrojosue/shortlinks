const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { emailExist, userIdExist } = require('../helpers/db-validators')

const {
  usersGet,
  userGetById,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch
} = require('../controllers/users')

const router = Router()

router.get('/users/', usersGet)

router.get('/users/:id', [
  check('id', 'id is not valid').isMongoId(),
  validateFields
],
userGetById)

router.put('/users/:id', [
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(userIdExist),
  validateFields
],
usersPut)

router.post('/users/', [
  check('name', 'name is required').not().isEmpty(),
  check('pass', 'The password must be at least 6 letters').isLength({ min: 6 }),
  check('email', 'email is not valid').isEmail(),
  check('email').custom(emailExist),
  validateFields
], usersPost)

router.delete('/users/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(userIdExist),
  validateFields
], usersDelete)

router.patch('/users/', usersPatch)

module.exports = router
