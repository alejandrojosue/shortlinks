const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'shortLinks',
      version: '1.0.0'
    }
  },
  apis: ['./routes/*.js']
}

const openapiSpecification = swaggerJsdoc(options)

// Function or setup ours docs
const swaggerDocs = (app, port) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.send(openapiSpecification)
    console.log('PORT: ' + port)
  })
}

module.exports = { swaggerDocs }
