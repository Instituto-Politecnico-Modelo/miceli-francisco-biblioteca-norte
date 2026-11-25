const { Router } = require("express");
const authRoutes = require("./authRoutes.js");
const libroRoutes = require("./libroRoutes.js");
const usuarioRoutes = require("./usuarioRoutes.js");
const prestamoRoutes = require("./prestamoRoutes.js");

const router = Router();

router.use("/auth", authRoutes);
router.use("/libros", libroRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/prestamos", prestamoRoutes);

module.exports = router;
