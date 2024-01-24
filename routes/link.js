const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { userIdExist, titleValidate, urlValidate, titleExist, linkIdExist } = require('../helpers/db-validators')

const {
  linksGet,
  linkGetById,
  linksPost,
  linksPut,
  linksDelete
} = require('../controllers/links')

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Links
 *   description: Endpoints relacionados con la gestión de links.
 */

/**
 * @swagger
 * /api/links:
 *   get:
 *     summary: Get all links
 *     description: Retrieve a list of all links with pagination support.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Number of items to retrieve (default is 10).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: from
 *         description: Starting index for pagination (default is 0).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of links along with the total count.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of links.
 *                 links:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Link'
 */

/**
 * @swagger
 * /api/links/{id}:
 *   get:
 *     summary: Get a link by ID
 *     description: Retrieve a single link by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the link to retrieve.
 *         schema:
 *           type: string
 *           format: mongoId
 *     responses:
 *       200:
 *         description: The link with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       404:
 *         description: Link not found.
 */

/**
 * @swagger
 * /api/links:
 *   post:
 *     summary: Create a new link
 *     description: Create a new link with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewLink'
 *     responses:
 *       200:
 *         description: The created link.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       400:
 *         description: Bad request or validation error.
 */

/**
 * @swagger
 * /api/links/{id}:
 *   put:
 *     summary: Update a link by ID
 *     description: Update an existing link with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the link to update.
 *         schema:
 *           type: string
 *           format: mongoId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLink'
 *     responses:
 *       200:
 *         description: The updated link.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       404:
 *         description: Link not found.
 *       400:
 *         description: Bad request or validation error.
 */

/**
 * @swagger
 * /api/links/{id}:
 *   delete:
 *     summary: Delete a link by ID
 *     description: Delete an existing link by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the link to delete.
 *         schema:
 *           type: string
 *           format: mongoId
 *     responses:
 *       200:
 *         description: The deleted link.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       404:
 *         description: Link not found.
 */

router.get('/', linksGet)

router.get('/:id', [
  check('id', 'id is not valid').isMongoId(),
  validateFields
], linkGetById)

router.post('/', [
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

router.put('/:id', [
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(linkIdExist),
  check('userId').custom(userIdExist),
  check('title').custom(titleValidate),
  check('title').custom(titleExist),
  check('url').custom(urlValidate),
  validateFields
], linksPut)

router.delete('/:id', [
  check('id', 'id is not valid').isMongoId(),
  check('id').custom(linkIdExist),
  validateFields
], linksDelete)

module.exports = router
