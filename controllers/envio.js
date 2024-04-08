const { response } = require("express"); // Importa la función `response` desde el módulo express
const bcrypt = require("bcryptjs"); // Importa la librería bcryptjs para el cifrado de contraseñas
// Importar modelos
const Envio = require('../modules/envio'); // Importa el modelo de Usuario desde el módulo '../modules/usuario'

// Controlador para la solicitud GET a la ruta de usuarios


const enviosGet = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
    const envios = await Envio.find(); // Consulta todos los documentos de la colección Usuario
    res.json({
        envios, // Devuelve un objeto JSON con los usuarios obtenidos de la base de datos
    });
};

// Controlador para la solicitud GET de promedio de usuarios
const PromGet = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
    const envios = await Envio.find(); // Consulta todos los documentos de la colección Usuario
    envios.forEach((numero) => console.log(numero)); // Muestra cada documento de usuario por consola
    res.json({
            msg: "Prom API controlador", // Devuelve un mensaje indicando que es el controlador del promedio
            q,
            nombre,
            page,
            limit,
            envios, // Devuelve los usuarios obtenidos de la base de datos
    });
};
const enviosPost = async (req, res) => {
    const { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, direccionEnvio, totalEnvio, estado } = req.body
    let msg = "";


    const nuevoEnvio = new Envio ({
        tipoDeEnvio,
        detalleEnvio,
        fechaEnvio,
        estadoDelEnvio,
        direccionEnvio,
        totalEnvio,
        estado
    });

    try {
        nuevoEnvio.save();
        msg = "Envío registrado correctamente";
    } catch (error) {
        console.error(error);
        msg = "Error al registrar el envío";
    }

    console.log(msg);
    res.json({ msg });
};

const enviosPut = async (req, res = response) => {
    const { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, dirreccionEnvio, totalEnvio, estado } = req.body;

    try {
        const envio = await Envio.findByIdAndUpdate(req.params.id, {
            tipoDeEnvio,
            detalleEnvio,
            fechaEnvio,
            estadoDelEnvio,
            dirreccionEnvio,
            totalEnvio,
            estado
        }, { new: true });

        if (!envio) {
            return res.status(404).json({ msg: "Envío no encontrado" });
        }

        res.json({
            msg: "Envío Modificado",
            envio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al modificar el envío" });
    }
};

const enviosDelete = async (req, res = response) => {
    try {
        const envio = await Envio.findByIdAndDelete(req.params.id);

        if (!envio) {
            return res.status(404).json({ msg: "Envío no encontrado" });
        }

        res.json({
            msg: "Envío Eliminado",
            envio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el envío" });
    }
};


// Exporta los controladores de las rutas de usuarios para que estén disponibles para otros módulos
module.exports = {
    enviosGet,
    enviosPost,
    enviosPut,
    enviosDelete,
    PromGet,
};
