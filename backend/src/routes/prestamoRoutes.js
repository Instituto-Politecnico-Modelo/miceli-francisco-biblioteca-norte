const { Router } = require("express");
const prestamoController = require("../controllers/PrestamoController.js");
const requireAdmin = require("../middlewares/requireAdmin.js");

const router = Router();

router.get("/", requireAdmin, prestamoController.listar);
router.post("/", requireAdmin, prestamoController.crear);
router.post("/:id/devolucion", requireAdmin, prestamoController.devolver);

module.exports = router;
