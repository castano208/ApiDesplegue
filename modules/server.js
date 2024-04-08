const express = require('express');
const { dbConnection } = require("../database/config");
const cors = require("cors");
const bodyParser = require("body-parser");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Utiliza el puerto 3000 si no se especifica uno en las variables de entorno
        this.enviosPath = "/api/envios";
        this.authPath = "/api/auth";
        this.middlewares();
        this.routes();
        this.connectDb();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }

    middlewares() {
        if (process.env.NODE_ENV === 'production') {
            this.app.use(cors({
                origin: 'https://apidesplegue-1.onrender.com'
            }));
        } else {
            this.app.use(cors());
        }
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "/public"));
    }

    routes() {
        this.app.use(this.enviosPath, require("../routes/envio"));
        // this.app.use(this.authPath, require("../routes/auth"));
    }

    async connectDb() {
        try {
            await dbConnection();
            console.log("Conexión exitosa a la base de datos");
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            process.exit(1); // Sale de la aplicación con un código de error
        }
    }
}

module.exports = Server;