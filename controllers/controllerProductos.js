
//obtener datos

const { obtenerTodosService,
        obtenerPorIdService,
        crearProductoService,
        crearProductoVerificadoService,
        modificarProductoService,
        eliminarProductoService

    } = require("../services/service.productos")

function obtenerTodos(req,res){
    try {
        const params = req.query;
        const productosFiltrados = obtenerTodosService(params);
        res.status(200).json(productosFiltrados);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

function obtenerPorId(req, res) {
    try {
        const { idFiltro } = req.params;
        const productoFiltrado = obtenerPorIdService(idFiltro);
        res.status(200).json(productoFiltrado);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

function crearProducto(req, res) {
    try {
        const body = req.body;
        const nuevoProducto = crearProductoService(body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}
 

async function crearProductoverificado(req, res) {
    try {
        const body = req.body;
        const nuevoProducto = await crearProductoVerificadoService(body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

async function modificarProducto(req, res) {
    try {
        const productoModificado = modificarProductoService(req.body);
        res.status(200).json(productoModificado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function eliminarProducto(req, res) {
    try {
        const productoEliminado = eliminarProductoService(req.params.id);
        res.status(200).json(productoEliminado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


module.exports = {
    obtenerTodos,
    obtenerPorId,
    crearProducto,
    crearProductoverificado,
    modificarProducto,
    eliminarProducto
}