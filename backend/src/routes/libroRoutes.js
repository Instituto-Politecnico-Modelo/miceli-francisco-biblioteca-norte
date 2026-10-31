const { Router } = require("express");
const libroController = require("../controllers/LibroController.js");
const requireAdmin = require("../middlewares/requireAdmin.js");

const router = Router();

router.get("/", libroController.listar);
router.get("/:id", libroController.obtenerPorId);
router.post("/", requireAdmin, libroController.crear);
router.put("/:id", requireAdmin, libroController.actualizar);
router.delete("/:id", requireAdmin, libroController.eliminar);

module.exports = router;
