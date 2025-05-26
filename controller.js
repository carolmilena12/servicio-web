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
//obtener datos

function obtenerTodos(req,res){

    const {precioMin,nombre} = req.query
    let productosFiltrados = [...productos]
    if(nombre) {
        productosFiltrados = productosFiltrados.filter(f =>
            f.nombre.toLowerCase() == nombre.toLowerCase() ||
            f.nombre.toLowerCase().includes(nombre.toLowerCase())
        )
    }
 
    if(precioMin) {
        productosFiltrados = productosFiltrados.filter(f =>
            f.precio >= parseFloat(precioMin)
        )
    }
 
    res.status(200).json(productosFiltrados)

}
function obtenerPorId (req, res) {
    const {idFiltro} = req.params
   
    const productoFiltrado = productos.find(f=>f.id == parseInt(idFiltro))
 
    if (productoFiltrado){
        res.status(200).json(productoFiltrado)
    }else{
        res.status(400).json({error: 'OBJETO NO ENCONTRADO'})
    }
}

function crearProducto (req, res) {
    const body = req.body

    const nuevo_productos = {
        id: productos.length + 1, 
        nombre: body.nombre, 
        precio: body.precio, 
        categoria: body.categoria
    }

    productos.push(nuevo_productos)
    res.status(201).json(nuevo_productos)
}
 
function obtenerNombre(nombre) {
    //TO DO buscar el producto
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const encontrado = productos.find(f=> f.nombre == nombre)
            resolve(encontrado)
        }, 2000) // tiempo simulado  
    })
    
}
async function crearProductoverificado(req,res) {
    /// Obtener datos del cuerpo de la petición
    const body = req.body;

    // TODO Bbuscar el producto llamar obtenerNombre
    const productoExistente = await obtenerNombre(body.nombre);
    console.log(productoExistente)
    if (productoExistente?.id) {
           return res.status(400).json({ error: 'El producto ya existe' });
    }

    // Si no existe, crear el nuevo producto
    const nuevo_producto = {
        id: productos.length + 1,
        nombre: body.nombre,
        precio: body.precio,
        categoria: body.categoria
    };
    productos.push(nuevo_producto);
    res.status(201).json(nuevo_producto)
}

async function modificarProducto(req, res) {
    // req.body => id
    const body = req.body
    const productoEncontrado = productos.find(f=> f.id === parseInt(body.id))
    if (!productoEncontrado) {
        return res.status(404).json({error: 'El producto no se encontro.'})
    }

    if (body.nombre && productoEncontrado.nombre != body.nombre ) {
        productoEncontrado.nombre = body.nombre
    }
    if (body.precio && productoEncontrado.precio != body.precio ) {
        productoEncontrado.precio = body.precio
    }
    if (body.categoria && productoEncontrado.categoria != body.categoria ) {
        productoEncontrado.categoria = body.categoria
    }
    res.status(200).json(productoEncontrado)
}

async function eliminarProducto(req, res) {
    const params = req.params
    const productoEncontradoIdx = productos.findIndex(f=> f.id === parseInt(params.id))
    if(productoEncontradoIdx == -1) {
        return res.status(404).json({error: 'El producto no se encontro.'})
    }

    const productoEliminado = productos.splice(productoEncontradoIdx, 1)
    res.status(200).json(productoEliminado[0])
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crearProducto,
    crearProductoverificado,
    obtenerNombre,
    modificarProducto,
    eliminarProducto
}