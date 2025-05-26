const express = require('express')

const app = express()
const routes= require('./routes/routeProductos')

//transfromacion de respuestas a json

//importar nuestras rutas
app.use(express.json())
app.use('/',routes)

//manejo de errores

module.exports = app