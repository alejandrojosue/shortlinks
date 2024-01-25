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
