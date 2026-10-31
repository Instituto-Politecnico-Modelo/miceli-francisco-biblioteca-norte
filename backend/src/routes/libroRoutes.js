const { Router } = require("express");
const libroController = require("../controllers/LibroController.js");

const router = Router();

router.get("/", libroController.listar);
router.get("/:id", libroController.obtenerPorId);
router.post("/", libroController.crear);
router.put("/:id", libroController.actualizar);
router.delete("/:id", libroController.eliminar);

module.exports = router;
