const express = require('express')
const route = express.Router()
const controllerProductos = require('../controllers/controllerProductos')

route.get('/api/prueba',(req,res)=>{
    res.json({
        dato_salida: 25,
        directorio:'/',
        rutas:'../../'
    })
})
route.get('/api/productos',controllerProductos.obtenerTodos)

route.get('/api/productos/:idFiltro',controllerProductos.obtenerPorId)
route.post('/api/productos', controllerProductos.crearProducto)
route.post('/api/productos-verificado', controllerProductos.crearProductoverificado)
route.put('/api/productos', controllerProductos.modificarProducto)
route.delete('/api/productos/:id', controllerProductos.eliminarProducto)


module.exports = route