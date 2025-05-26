//simular base de datos
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
function obtenerTodosService(params){
    let productosFiltrados = [...productos]
    if(params.nombre) {
        productosFiltrados = productosFiltrados.filter(f =>
            f.nombre.toLowerCase() == params.nombre.toLowerCase() ||
            f.nombre.toLowerCase().includes(params.nombre.toLowerCase())
        )
    }
 
    if(params.precioMin) {
        productosFiltrados = productosFiltrados.filter(f =>
            f.precio >= parseFloat(params.precioMin)
        )
    }
    return (productosFiltrados)
}

function obtenerPorIdService(id) {
    const productoFiltrado = productos.find(f => f.id == parseInt(id));

    if (!productoFiltrado) {
        throw new Error('OBJETO NO ENCONTRADO');
    }

    return productoFiltrado;
}
function crearProductoService(body) {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: body.nombre,
        precio: body.precio,
        categoria: body.categoria
    };

    productos.push(nuevoProducto);
    return nuevoProducto;
}
function obtenerNombreService(nombre) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const encontrado = productos.find(f => f.nombre === nombre);
            resolve(encontrado);
        }, 2000); // tiempo simulado
    });
}

async function crearProductoVerificadoService(body) {
    const productoExistente = await obtenerNombreService(body.nombre);
    if (productoExistente?.id) {
        throw new Error('El producto ya existe');
    }

    const nuevoProducto = {
        id: productos.length + 1,
        nombre: body.nombre,
        precio: body.precio,
        categoria: body.categoria
    };

    productos.push(nuevoProducto);
    return nuevoProducto;
}

function modificarProductoService(body) {
    const producto = productos.find(f => f.id === parseInt(body.id));
    if (!producto) {
        throw new Error('El producto no se encontró.');
    }

    if (body.nombre && producto.nombre !== body.nombre) {
        producto.nombre = body.nombre;
    }
    if (body.precio && producto.precio !== body.precio) {
        producto.precio = body.precio;
    }
    if (body.categoria && producto.categoria !== body.categoria) {
        producto.categoria = body.categoria;
    }

    return producto;
}

function eliminarProductoService(id) {
    const index = productos.findIndex(f => f.id === parseInt(id));
    if (index === -1) {
        throw new Error('El producto no se encontró.');
    }

    const eliminado = productos.splice(index, 1);
    return eliminado[0];
}
module.exports = {
    obtenerTodosService,
    obtenerPorIdService,
    crearProductoService,
    crearProductoVerificadoService,
    modificarProductoService,
    eliminarProductoService
}