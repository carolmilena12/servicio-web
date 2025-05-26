const { obtenerTodos, 
    obtenerPorId, 
    crearProductoverificado, 
    modificarProducto,
    eliminarProducto

} = require('../controllers/controllerProductos')

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

        // TODO crear test para crearProductoVerificado
    test('crearProductoVerificado - debe devolver error si el producto ya existe', () => {
        const req = mockRequest({}, {}, { nombre: "Laptop", precio: 5000, categoria: "Equipos" })
        const res = mockResponse()

        crearProductoverificado(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'El producto ya existe' })
    })

    test('crearProductoVerificado - debe crear el producto si no existe', () => {
        const req = mockRequest({}, {}, { nombre: "Monitor", precio: 1500, categoria: "Pantallas" })
        const res = mockResponse()

        crearProductoverificado(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nombre: "Monitor", precio: 1500 }))
    })

    // TODO crear test para modificarProducto
    test('modificarProducto - debe modificar un producto existente', () => {
        const req = mockRequest({}, {}, { id: 2, nombre: "Silla Gamer", precio: 999, categoria: "Mobiliario" })
        const res = mockResponse()

        modificarProducto(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 2, nombre: "Silla Gamer" }))
    })

    test('eliminarProducto - debe eliminar el producto si existe', () => {
    const req = mockRequest({}, { id: 2 }) // Existe un producto con id 2
    const res = mockResponse()

    eliminarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'ELIMINADO CON ÉXITO' })

    // Verificamos que el producto ya no esté en la lista
    const productoEliminado = productos.find(p => p.id === 2)
    expect(productoEliminado).toBeUndefined()
})

test('eliminarProducto - debe devolver 400 si el producto no existe', () => {
    const req = mockRequest({}, { id: 99 }) // No existe producto con id 99
    const res = mockResponse()

    eliminarProducto(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'OBJETO NO ENCONTRADO' })
})
})