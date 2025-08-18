const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

// --- Casos Controller ---

// Listar todos os casos
function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.status(200).json(casos);
}

// Buscar caso por ID
function getCasoById(req, res) {
  const { id } = req.params;
  const caso = casosRepository.findById(id);
  if (!caso) return res.status(404).json({ status: 404, message: "Caso não encontrado" });
  res.status(200).json(caso);
}

// Criar novo caso
function createCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;

  if (!titulo || !descricao || !status || !agente_id) {
    return res.status(400).json({ status: 400, message: "Parâmetros inválidos" });
  }

  // Verifica se o agente existe
  const agente = agentesRepository.findById(agente_id);
  if (!agente) return res.status(400).json({ status: 400, message: "Agente não encontrado" });

  const novoCaso = casosRepository.create({ titulo, descricao, status, agente_id });
  res.status(201).json(novoCaso);
}

// Atualizar caso completo
function updateCaso(req, res) {
  const { id } = req.params;
  const casoAtualizado = casosRepository.update(id, req.body);
  if (!casoAtualizado) return res.status(404).json({ status: 404, message: "Caso não encontrado" });
  res.status(200).json(casoAtualizado);
}

// Atualizar caso parcialmente
function patchCaso(req, res) {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  const casoAtualizado = casosRepository.update(id, dadosAtualizados);
  if (!casoAtualizado) return res.status(404).json({ status: 404, message: "Caso não encontrado" });

  res.status(200).json(casoAtualizado);
}

// Remover caso
function deleteCaso(req, res) {
  const { id } = req.params;
  const removido = casosRepository.remove(id);
  if (!removido) return res.status(404).json({ status: 404, message: "Caso não encontrado" });
  res.status(204).send();
}

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  patchCaso,
  deleteCaso,
};
