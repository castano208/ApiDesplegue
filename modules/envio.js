const {Schema, model} = require('mongoose');

const EnvioSchema = Schema({
    tipoDeEnvio: {
        type: String,
    },
    detalleEnvio: {
        type: String,
    },
    fechaEnvio: {
        type: String
    },
    estadoDelEnvio: {
        type: String,
    },
    direccionEnvio: { 
        type: String
    },
    totalEnvio: {
        type: Number
    },
    estado: {
        type: Boolean,
        default: true
    },
});
// Crea y exporta el modelo Usuario a partir del esquema UsuarioSchema
module.exports = model('Envio', EnvioSchema);
