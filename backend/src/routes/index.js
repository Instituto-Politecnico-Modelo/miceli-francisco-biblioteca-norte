const { Router } = require("express");
const authRoutes = require("./authRoutes.js");
const libroRoutes = require("./libroRoutes.js");

const router = Router();

router.use("/auth", authRoutes);
router.use("/libros", libroRoutes);

module.exports = router;
