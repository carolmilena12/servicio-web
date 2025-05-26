const app = require ('./app')

const PORT = 7000

const server = app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT} `)
})

module.exports = server