const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { emailExist, userIdExist } = require('../helpers/db-validators')

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch
} = require('../controllers/users')

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints relacionados con la gestión de usuarios.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene la lista de usuarios.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Número máximo de usuarios a devolver.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: from
 *         description: Índice de inicio para la paginación.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK. Devuelve la lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Número total de usuarios.
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del usuario.
 *         name:
 *           type: string
 *           description: Nombre del usuario.
 *         email:
 *           type: string
 *           description: Correo del usuario.
 *         status:
 *           type: boolean
 *           description: Estado del usuario.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *     requestBody:
 *       description: Datos del usuario a actualizar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Propiedades del usuario a actualizar
 *     responses:
 *       200:
 *         description: OK. Usuario actualizado correctamente.
 *       400:
 *         description: Bad Request. Error en la validación de campos.
 *       404:
 *         description: Not Found. No se encontró el usuario con el ID especificado.
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     tags: [Users]
 *     requestBody:
 *       description: Datos del nuevo usuario a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               clave:
 *                 type: string
 *               correo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created. Usuario creado correctamente.
 *       400:
 *         description: Bad Request. Error en la validación de campos.
 *       409:
 *         description: Conflict. Ya existe un usuario con el correo proporcionado.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: OK. Usuario eliminado correctamente.
 *       400:
 *         description: Bad Request. Error en la validación de campos.
 *       404:
 *         description: Not Found. No se encontró el usuario con el ID especificado.
 */

/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Actualiza información parcial de los usuarios.
 *     tags: [Users]
 *     requestBody:
 *       description: Datos parciales a actualizar en los usuarios.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Propiedades del usuario a actualizar parcialmente
 *     responses:
 *       200:
 *         description: OK. Información de usuario actualizada correctamente.
 *       400:
 *         description: Bad Request. Error en la validación de campos.
 */

router.get('/', usersGet)

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userIdExist),
  validateFields
],
usersPut)

router.post('/', [
  check('nombre', 'El nombre es requerido').not().isEmpty(),
  check('clave', 'La clave debe tener al menos 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExist),
  validateFields
], usersPost)

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userIdExist),
  validateFields
], usersDelete)

router.patch('/', usersPatch)

module.exports = router
