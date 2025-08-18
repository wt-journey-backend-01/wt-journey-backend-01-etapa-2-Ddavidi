const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

// --- Rotas para agentes ---

// Listar todos os agentes
router.get("/", agentesController.getAllAgentes);

// Buscar agente por ID
router.get("/:id", agentesController.getAgenteById);

// Criar novo agente
router.post("/", agentesController.createAgente);

// Atualizar agente completo
router.put("/:id", agentesController.updateAgente);

// Atualizar agente parcialmente
router.patch("/:id", agentesController.patchAgente);

// Remover agente
router.delete("/:id", agentesController.deleteAgente);

// Exporta o router para uso no server.js
module.exports = router;
