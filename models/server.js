const express = require('express')
const cors = require('cors')
const { dbConnect } = require('../config/database')
const { swaggerDocs: swaggerDocsV1 } = require('../documentation/swagger')
// const notFound = require('../middlewares/not-found')
const errorHandler = require('../middlewares/error-handler')
class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

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
    this.app.use('/api/', require('../routes/user'))
    this.app.use('/api/', require('../routes/link'))
    // this.app.use(notFound)
    this.app.use(errorHandler)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.clear()
      console.log('server is running in', this.port)
      swaggerDocsV1(this.app)
    })
  }
}

module.exports = Server
