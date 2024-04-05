const { response } = require("express"); // Importa la función `response` desde el módulo express
const bcrypt = require("bcryptjs"); // Importa la librería bcryptjs para el cifrado de contraseñas
// Importar modelos
const Envio = require("../modules/envio"); // Importa el modelo de Usuario desde el módulo '../modules/usuario'
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
// Controlador para la solicitud POST a la ruta de usuarios
const enviosPost = async (req, res = response) => {
    const body = req.body; // Extrae el cuerpo de la solicitud
    let msg = ""; // Inicializa una variable para el mensaje de respuesta
    const envio = new Envio(body); // Crea un nuevo objeto Usuario con los datos del cuerpo de la solicitud
    const { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, dirreccionEnvio, totalEnvio, estado } = req.body; // Extrae los datos del cuerpo de la solicitud
    try {
        await envio.save(); // Guarda el usuario en la base de datos
        msg = "Envio Registrado"; // Asigna un mensaje de éxito
    } catch (error) {
        console.log(error); // Muestra el error por consola
        if (error) {
            if (error.name === "ValidationError") {
                console.error(Object.values(error.errors).map((val) => val.message)); // Muestra los mensajes de error de validación
                msg = Object.values(error.errors).map((val) => val.message);
                // Asigna los mensajes de error al mensaje de respuesta
            }
        }
    }
    console.log(msg); // Muestra el mensaje de respuesta por consola
    res.json({
        msg: msg, // Devuelve el mensaje de respuesta como un objeto JSON
    });
};
// Controlador para la solicitud PUT a la ruta de usuarios
const enviosPut = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    console.log(body); // Muestra los parámetros de la consulta por consola
    const { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, dirreccionEnvio, totalEnvio, estado } = req.body; // Extrae los datos del cuerpo de la solicitud
    // Busca y actualiza un usuario en la base de datos
    const envio = await Envio.findOneAndUpdate(
        { detalleEnvio: detalleEnvio }
    );
    res.json({
        msg: "Envio Modificado", // Devuelve un mensaje indicando que se modificó el usuario
        envio, // Devuelve el usuario modificado
    });
};
// Controlador para la solicitud DELETE a la ruta de usuarios
const enviosDelete = async (req, res = response) => {
    const body = req.query; // Extrae los parámetros de la consulta
    console.log(body); // Muestra los parámetros de la consulta por consola
    const { tipoDeEnvio, detalleEnvio, fechaEnvio, estadoDelEnvio, dirreccionEnvio, totalEnvio, estado } = req.query; // Extrae los datos del cuerpo de la solicitud
    // Busca y elimina un usuario en la base de datos
    const envio = await Envio.findOneAndDelete({ detalleEnvio: detalleEnvio });
    res.json({
        msg: "Envio Eliminado", // Devuelve un mensaje indicando que se eliminó el usuario
        envio, // Devuelve el usuario eliminado
    });
};
// Exporta los controladores de las rutas de usuarios para que estén disponibles para otros módulos
module.exports = {
    enviosGet,
    enviosPost,
    enviosPut,
    enviosDelete,
    PromGet,
};
