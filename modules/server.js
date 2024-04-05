const express = require('express'); // Importa la librería express para crear el servidor web
const { dbConnection } = require("../database/config"); // Importa la función de conexión a la base de datos
const cors = require("cors"); // Importa la librería cors para permitir peticiones desde otros dominios
const bodyParser = require("body-parser"); // Importa la librería bodyparser para parsear datos del cuerpo de las peticiones HTTP
class Server {
    constructor() {
        this.app = express(); // Inicializa la aplicación express
        this.port = process.env.PORT; // Obtiene el puerto de conexión desde las variables de entorno
        this.enviosPath = "/api/envios"; // Define la ruta base para las operaciones relacionadas con usuarios
        this.authPath = "/api/auth"; // Define la ruta base para las operaciones de autenticación
        this.middlewares(); // Configura los middlewares de la aplicación
        this.routes(); // Configura las rutas de la aplicación
        this.connectDb(); // Conecta con la base de datos MongoDB
    }
    listen() {
        this.app.listen(this.port, () => {
        console.log(`Eschando por el puerto ${this.port}`); // Inicia el servidor y muestra un mensaje en consola
        });
    }
    middlewares() {
        // Configura CORS para permitir peticiones desde otros dominios
        this.app.use(cors());
        // Configura body-parser para parsear datos del cuerpo de las peticiones HTTP
        this.app.use(bodyParser.json()); // para parsear application/json
        // Configura express.static para servir archivos estáticos
        this.app.use(express.static(__dirname + "/public"));
    }
    routes() {
        // Configura las rutas de la aplicación
        this.app.use(this.enviosPath, require("../routes/envio")); // Ruta para las operaciones relacionadas con usuarios
        // this.app.use(this.authPath, require("../routes/auth")); // Ruta para las operaciones de autenticación
    }
    async connectDb() {
        await dbConnection(); // Conecta con la base de datos MongoDB al inicio del servidor
    }
}
module.exports = Server; // Exporta la clase Server para que esté disponible para otros módulos
