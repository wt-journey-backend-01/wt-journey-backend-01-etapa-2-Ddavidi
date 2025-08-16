const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

// Listar todos os agentes
router.get("/", agentesController.getAllAgentes);

// Buscar agente por ID
router.get("/:id", agentesController.getAgenteById);

// Criar novo agente
router.post("/", agentesController.createAgente);

// Atualizar agente completo
router.put("/:id", agentesController.updateAgente);

// Remover agente
router.delete("/:id", agentesController.deleteAgente);

module.exports = router;
