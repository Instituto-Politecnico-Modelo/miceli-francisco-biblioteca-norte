const { Router } = require("express");
const authController = require("../controllers/AuthController.js");
const requireAdmin = require("../middlewares/requireAdmin.js");

const router = Router();

router.post("/login", authController.login);
router.get("/sesion", requireAdmin, authController.sesion);
router.post("/logout", requireAdmin, authController.logout);

module.exports = router;
