const agentesRepository = require("../repositories/agentesRepository");

// --- Agentes Controller ---

// Listar todos os agentes
function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.status(200).json(agentes);
}

// Buscar agente por ID
function getAgenteById(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.findById(id);
  if (!agente) return res.status(404).json({ status: 404, message: "Agente não encontrado" });
  res.status(200).json(agente);
}

// Criar agente
function createAgente(req, res) {
  const { nome, cargo, dataDeIncorporacao } = req.body;
  if (!nome || !cargo || !dataDeIncorporacao) {
    return res.status(400).json({ status: 400, message: "Parâmetros inválidos" });
  }
  const novoAgente = agentesRepository.create({ nome, cargo, dataDeIncorporacao });
  res.status(201).json(novoAgente);
}

// Atualizar agente completo
function updateAgente(req, res) {
  const { id } = req.params;
  const agenteAtualizado = agentesRepository.update(id, req.body);
  if (!agenteAtualizado) return res.status(404).json({ status: 404, message: "Agente não encontrado" });
  res.status(200).json(agenteAtualizado);
}

// Atualizar agente parcialmente
function patchAgente(req, res) {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  // Não permitir alteração de ID
  if (dadosAtualizados.id && dadosAtualizados.id !== id) {
    return res.status(400).json({ status: 400, message: "Não é permitido alterar o ID do agente." });
  }

  const agenteAtualizado = agentesRepository.update(id, dadosAtualizados);
  if (!agenteAtualizado) return res.status(404).json({ status: 404, message: "Agente não encontrado" });

  res.status(200).json(agenteAtualizado);
}

// Remover agente
function deleteAgente(req, res) {
  const { id } = req.params;
  const removido = agentesRepository.remove(id);
  if (!removido) return res.status(404).json({ status: 404, message: "Agente não encontrado" });
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente,
};
