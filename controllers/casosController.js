const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { validateCasoData, validatePartialCasoData } = require('../utils/validator');

/**
 * Lista todos os casos, com filtros opcionais.
 */
function getAllCasos(req, res) {
    try {
        const casos = casosRepository.findAll(req.query);
        res.status(200).json(casos);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

/**
 * Busca um caso específico pelo ID.
 */
function getCasoById(req, res) {
    try {
        const { id } = req.params;
        const caso = casosRepository.findById(id);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.status(200).json(caso);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

/**
 * Retorna os dados do agente responsável por um caso.
 */
function getAgenteByCasoId(req, res) {
    try {
        const { caso_id } = req.params;
        const caso = casosRepository.findById(caso_id);
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        const agente = agentesRepository.findById(caso.agente_id);
        if (!agente) {
            return res.status(404).json({ message: "Agente associado ao caso não encontrado" });
        }
        res.status(200).json(agente);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

/**
 * Cria um novo caso.
 */
function createCaso(req, res) {
    try {
        const { errors, data } = validateCasoData(req.body);
        if (errors) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }
        // Verifica se o agente_id existe
        if (!agentesRepository.findById(data.agente_id)) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors: { agente_id: "Agente com o ID fornecido não existe." } });
        }
        const novoCaso = casosRepository.create(data);
        res.status(201).json(novoCaso);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

/**
 * Atualiza todos os dados de um caso (PUT).
 */
function updateCaso(req, res) {
    try {
        const { id } = req.params;
        if (!casosRepository.findById(id)) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        const { errors, data } = validateCasoData(req.body);
        if (errors) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }
        // Verifica se o agente_id existe
        if (!agentesRepository.findById(data.agente_id)) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors: { agente_id: "Agente com o ID fornecido não existe." } });
        }

        const casoAtualizado = casosRepository.update(id, data);
        res.status(200).json(casoAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

/**
 * Atualiza parcialmente os dados de um caso (PATCH).
 */
function updatePartialCaso(req, res) {
    try {
        const { id } = req.params;
        if (!casosRepository.findById(id)) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        const { errors, data } = validatePartialCasoData(req.body);
        if (errors) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }
        // Se o agente_id está sendo atualizado, verifica se ele existe
        if (data.agente_id && !agentesRepository.findById(data.agente_id)) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors: { agente_id: "Agente com o ID fornecido não existe." } });
        }

        const casoAtualizado = casosRepository.update(id, data);
        res.status(200).json(casoAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}


/**
 * Remove um caso.
 */
function deleteCaso(req, res) {
    try {
        const { id } = req.params;
        const removido = casosRepository.remove(id);
        if (!removido) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    getAgenteByCasoId,
    createCaso,
    updateCaso,
    updatePartialCaso,
    deleteCaso
};
