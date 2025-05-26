const { obtenerTodos, obtenerPorId, crearProducto, crearProductoVerificado } = require('./controller')

// MOCK base de datos
let productos = [
    {
        id: 1, 
        nombre: "Laptop", 
        precio: 5000.0, 
        categoria: "Equipos"
    },
    {
        id: 2, 
        nombre: "Silla", 
        precio: 899.0, 
        categoria: "Mobiliario"
    },
    {
        id: 3, 
        nombre: "Disco duro", 
        precio: 100.0, 
        categoria: "Accesorios"
    },
]

// Mock req y res
const mockRequest = (query = {}, params = {}, body = {}) => ({
    query,
    params,
    body
})

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

// Resetear los datos antes de iniciar pruebas
beforeEach(()=>{
    // Reinicar la base de datos.
    productos = [
        {
            id: 1, 
            nombre: "Laptop", 
            precio: 5000.0, 
            categoria: "Equipos"
        },
        {
            id: 2, 
            nombre: "Silla", 
            precio: 899.0, 
            categoria: "Mobiliario"
        },
        {
            id: 3, 
            nombre: "Disco duro", 
            precio: 100.0, 
            categoria: "Accesorios"
        },
    ]
})

// Pruebas de los metos del controlador
describe('Controlador de Productos', ()=>{
    test('prueba de metodo obtenerTodos() debe devolver todos los productos', ()=>{
        const req = mockRequest()
        const res = mockResponse()

        obtenerTodos(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(productos)
    })

    test('obtener prodcutos por ID - deberia devolver 400 por que no existe el ID', ()=>{
        const req = mockRequest(null, { id: 100 })
        const res = mockResponse()

        obtenerPorId(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: 'OBJETO NO ENCONTRADO'})
    })
})