const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

// --- Rotas para casos ---

// Listar todos os casos
router.get("/", casosController.getAllCasos);

// Buscar caso por ID
router.get("/:id", casosController.getCasoById);

// Criar novo caso
router.post("/", casosController.createCaso);

// Atualizar caso completo
router.put("/:id", casosController.updateCaso);

// Atualizar caso parcialmente
router.patch("/:id", casosController.patchCaso);

// Remover caso
router.delete("/:id", casosController.deleteCaso);

// Exporta o router para uso no server.js
module.exports = router;
