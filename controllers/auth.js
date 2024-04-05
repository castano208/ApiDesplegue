const Envio = require('../modules/envio');
const bcrypt = require('bcryptjs');

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Envio.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Correo electrónico no encontrado'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Envio inactivo'
            });
        }

        const resultado = await comparePassword(password, usuario.password);

        if (resultado) {
            return res.status(200).json({
                msg: 'El password es correcto'
            });
        } else {
            return res.status(400).json({
                msg: 'El password es incorrecto'
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Apreciado usuario, contacte al administrador.'
        });
    }
};

module.exports = {
    login
};
