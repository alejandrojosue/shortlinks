const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config()
const doc = {
  info: {
    title: 'DOCUMENTATION for the SHORTLINKS website',
    version: '1.0.0',
    description: 'The backend for shortiLinks made in Node js'
  },
  host: 'http://localhost:' + process.env.PORT,
  basePath: '/api',
  schemes: [`http://localhost${process.env.PORT}/api - Development Server`]
}

const outputFile = '../documentation/swagger-documentation.json'
const routes = ['../routes/*.js']
swaggerAutogen(outputFile, routes, doc)
