const app = require("./app.js");
const authService = require("./services/AuthService.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

    const codigoGenerado = authService.obtenerCodigoGenerado();
    if (codigoGenerado) {
        console.log(`Código de administrador (temporal, válido hasta reiniciar): ${codigoGenerado}`);
        console.log("Para fijar uno propio, definí la variable de entorno ADMIN_CODIGO.");
    }
});
