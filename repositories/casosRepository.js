const { v4: uuidv4 } = require('uuid');

// Simula uma base de dados em memória para os casos
let casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio na Savassi",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro Savassi, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
  },
  {
    id: "c8b7c8a8-3a2b-4e4a-9f0a-3e2a1b0c9d8e",
    titulo: "Furto de veículo",
    descricao: "Um carro foi furtado na noite de ontem no bairro União.",
    status: "solucionado",
    agente_id: "a2a162c1-c233-41f7-b8ab-a232f0b457e7"
  }
];

/**
 * Retorna todos os casos, com possibilidade de filtrar e buscar.
 * @param {Object} filters - Objeto contendo os filtros (agente_id, status, q).
 * @returns {Array} - Lista de casos.
 */
function findAll(filters = {}) {
    let casosFiltrados = [...casos];
    const { agente_id, status, q } = filters;

    if (agente_id) {
        casosFiltrados = casosFiltrados.filter(c => c.agente_id === agente_id);
    }

    if (status) {
        casosFiltrados = casosFiltrados.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }

    if (q) {
        const searchTerm = q.toLowerCase();
        casosFiltrados = casosFiltrados.filter(c =>
            c.titulo.toLowerCase().includes(searchTerm) ||
            c.descricao.toLowerCase().includes(searchTerm)
        );
    }

    return casosFiltrados;
}

/**
 * Busca um caso pelo seu ID.
 * @param {string} id - O ID do caso.
 * @returns {Object|undefined} - O objeto do caso ou undefined se não for encontrado.
 */
function findById(id) {
    return casos.find(c => c.id === id);
}

/**
 * Cria um novo caso.
 * @param {Object} casoData - Os dados do novo caso.
 * @returns {Object} - O caso recém-criado.
 */
function create(casoData) {
    const novoCaso = { id: uuidv4(), ...casoData };
    casos.push(novoCaso);
    return novoCaso;
}

/**
 * Atualiza um caso existente (completo ou parcial).
 * @param {string} id - O ID do caso a ser atualizado.
 * @param {Object} dadosAtualizados - Os novos dados do caso.
 * @returns {Object|null} - O caso atualizado ou null se não for encontrado.
 */
function update(id, dadosAtualizados) {
    const index = casos.findIndex(c => c.id === id);
    if (index === -1) {
        return null;
    }
    casos[index] = { ...casos[index], ...dadosAtualizados };
    return casos[index];
}

/**
 * Remove um caso pelo seu ID.
 * @param {string} id - O ID do caso a ser removido.
 * @returns {boolean} - True se o caso foi removido, false caso contrário.
 */
function remove(id) {
    const index = casos.findIndex(c => c.id === id);
    if (index === -1) {
        return false;
    }
    casos.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
