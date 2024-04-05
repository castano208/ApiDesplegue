const {Schema, model} = require('mongoose'); // Importa las funciones Schema y model de mongoose para definir esquemas y modelos de datos
// Define el esquema del modelo Usuario
const EnvioSchema = Schema({
    tipoDeEnvio : {
        type: String,
        required: [true, 'El tipo de envio es obligatorio'] // Define que el campo nombre es obligatorio
    },
    detalleEnvio: {
        type: String,   
        required: [true, 'El detalle del envio es obligatorio'] // Define que el campo email es obligatorio
    },
    fechaEnvio: {
        type: String,
        required: [true, 'La fecha de envio es obligatorio'], // Define que el campo password es obligatorio
    },
    estadoDelEnvio: {
        type: String,
        required: true, // Define que el campo rol es obligatorio
    },
    dirreccionEnvio: {
        type: String,
        required: true, // Define que el campo rol es obligatorio
    },
    totalEnvio  : {
        type: Number,   
        required: [true, 'El total del envio es obligatorio'] // Define que el campo email es obligatorio
    },
    estado: {
        type: Boolean,
        default: true, // Define el valor por defecto del campo estado como true
        required: [true, 'El estado es obligatorio'] // Define que el campo estado es obligatorio
    },
})
// Crea y exporta el modelo Usuario a partir del esquema UsuarioSchema
module.exports = model('Envio', EnvioSchema);
