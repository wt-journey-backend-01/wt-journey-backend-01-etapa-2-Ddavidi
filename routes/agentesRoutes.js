const express = require("express");
const router = express.Router();
const agenteController = require("../controllers/agenteController");

// Listar todos os agentes
router.get("/", agenteController.getAllAgentes);

// Buscar agente por ID
router.get("/:id", agenteController.getAgenteById);

// Criar novo agente
router.post("/", agenteController.createAgente);

// Atualizar agente completo
router.put("/:id", agenteController.updateAgente);

// Remover agente
router.delete("/:id", agenteController.deleteAgente);

module.exports = router;
