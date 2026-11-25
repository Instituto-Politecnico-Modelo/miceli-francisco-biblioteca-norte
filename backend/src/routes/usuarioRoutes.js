const { Router } = require("express");
const usuarioController = require("../controllers/UsuarioController.js");
const requireAdmin = require("../middlewares/requireAdmin.js");

const router = Router();

router.get("/", requireAdmin, usuarioController.listar);
router.post("/", requireAdmin, usuarioController.crear);

module.exports = router;
