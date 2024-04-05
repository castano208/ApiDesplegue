const Router = require('express'); // Importa la función Router de express para crear un router
const router = Router(); // Crea una instancia de Router
const path = require("path")

const {
  enviosGet,
  enviosPost,
  enviosPut,
  enviosDelete,
  PromGet,
} = require("../controllers/envio"); // Importa los controladores desde el archivo '../controllers/usuario'
// Define rutas y asigna controladores a cada ruta
// Ruta para obtener todos los usuarios (GET '/')

// Configura EJS como motor de plantillas
router.set("view engine", "ejs");
router.set("envios", path.join(__dirname, "views"));

router.get("/", async (req, res) => {
  try {
    const envios = await enviosGet(req, res);
    res.render("envios", { envios });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obteniendo los envíos");
  }
});

router.get("/nuevoEnvio", async (req, res) => {
  res.render("envios")
});

// Ruta para obtener el promedio de usuarios (GET '/promedio')
router.get("/promedio", PromGet);
// Ruta para crear un nuevo usuario (POST '/')
router.post("/", enviosPost);
// Ruta para actualizar un usuario existente (PUT '/')
router.put("/", enviosPut);
// Ruta para eliminar un usuario existente (DELETE '/')
router.delete('/', enviosDelete);
// Exporta el router para q
module.exports = router;