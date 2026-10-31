const app = require("./app.js");
const authService = require("./services/AuthService.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

    if (authService.usaCodigoPorDefecto()) {
        console.log("Administración: usando el código de prueba (ver README). Definí ADMIN_CODIGO para cambiarlo.");
    }
});
