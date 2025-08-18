const agentesRepository = require('../repositories/agentesRepository');
const { validateAgenteData, validatePartialAgenteData } = require('../utils/validator');

/**
 * Lista todos os agentes, com filtros e ordenação opcionais.
 */
function getAllAgentes(req, res) {
  try {
    const { cargo, sort } = req.query;
    const agentes = agentesRepository.findAll(cargo, sort);
    res.status(200).json(agentes);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

/**
 * Busca um agente específico pelo ID.
 */
function getAgenteById(req, res) {
  try {
    const { id } = req.params;
    const agente = agentesRepository.findById(id);
    if (!agente) {
      return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.status(200).json(agente);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

/**
 * Cria um novo agente.
 */
function createAgente(req, res) {
  try {
    const { errors, data } = validateAgenteData(req.body);
    if (errors) {
      return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
    }
    const novoAgente = agentesRepository.create(data);
    res.status(201).json(novoAgente);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

/**
 * Atualiza todos os dados de um agente (PUT).
 */
function updateAgente(req, res) {
  try {
    const { id } = req.params;
    if (!agentesRepository.findById(id)) {
        return res.status(404).json({ message: "Agente não encontrado" });
    }

    const { errors, data } = validateAgenteData(req.body);
    if (errors) {
      return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
    }
    
    const agenteAtualizado = agentesRepository.update(id, data);
    res.status(200).json(agenteAtualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

/**
 * Atualiza parcialmente os dados de um agente (PATCH).
 */
function updatePartialAgente(req, res) {
    try {
        const { id } = req.params;
        if (!agentesRepository.findById(id)) {
            return res.status(404).json({ message: "Agente não encontrado" });
        }

        const { errors, data } = validatePartialAgenteData(req.body);
        if (errors) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }
        
        const agenteAtualizado = agentesRepository.update(id, data);
        res.status(200).json(agenteAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

/**
 * Remove um agente.
 */
function deleteAgente(req, res) {
  try {
    const { id } = req.params;
    const removido = agentesRepository.remove(id);
    if (!removido) {
      return res.status(404).json({ message: "Agente não encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  updatePartialAgente,
  deleteAgente
};
