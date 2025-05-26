const request= require('supertest')
const app = require('./app')

describe ('Test Api producos', ()=>{
    it('GET /api/productos => debe devolver la lista de productos', async ()=>{
        const res = await request(app).get('/api/productos')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBe(3)
    })
    it('POST /api/productos => deberia crear un producto', async ()=>{
        const nuevoProducto = { nombre: "Laptop Pro", precio: 1500, categoria: "Equipos" }
        const res = await request(app)
                        .post('/api/productos')
                        .send(nuevoProducto)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toBe(4)
    })
 
})