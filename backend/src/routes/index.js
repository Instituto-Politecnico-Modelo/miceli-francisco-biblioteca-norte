const { Router } = require("express");
const libroRoutes = require("./libroRoutes.js");

const router = Router();

router.use("/libros", libroRoutes);

module.exports = router;
