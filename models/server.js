const express = require('express')
const cors = require('cors')
const { dbConnect } = require('../config/database')
const { swaggerDocs: swaggerDocsV1 } = require('../documentation/swagger')
class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'

    // Conectar a la base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi app
    this.routes()
  }

  async conectarDB () {
    await dbConnect()
  }

  middlewares () {
    // Cors
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio publico
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.usersPath, require('../routes/user'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('server is running in', this.port)
      swaggerDocsV1(this.app, this.port)
    })
  }
}

module.exports = Server
