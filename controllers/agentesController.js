const agentesRepository = require('../repositories/agentesRepository');

// Listar todos os agentes
function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.status(200).json(agentes);
}

// Buscar agente por ID
function getAgenteById(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    return res.status(404).json({ status: 404, message: "Agente não encontrado" });
  }
  res.status(200).json(agente);
}

// Criar novo agente
function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ status: 400, message: "Parâmetros inválidos" });
  }

  const novoAgente = agentesRepository.create({ nome, dataDeIncorporacao, cargo });
  res.status(201).json(novoAgente);
}

// Atualizar agente completo
function updateAgente(req, res) {
  const { id } = req.params;
  const agenteAtualizado = agentesRepository.update(id, req.body);
  if (!agenteAtualizado) {
    return res.status(404).json({ status: 404, message: "Agente não encontrado" });
  }
  res.status(200).json(agenteAtualizado);
}

// Remover agente
function deleteAgente(req, res) {
  const { id } = req.params;
  const removido = agentesRepository.remove(id);
  if (!removido) {
    return res.status(404).json({ status: 404, message: "Agente não encontrado" });
  }
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente
};
