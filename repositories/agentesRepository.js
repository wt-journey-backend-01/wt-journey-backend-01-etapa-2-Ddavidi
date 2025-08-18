const { v4: uuidv4 } = require('uuid');

// Simula uma base de dados em memória para os agentes
let agentes = [
    {
        id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    },
    {
        id: "a2a162c1-c233-41f7-b8ab-a232f0b457e7",
        nome: "Ana Pereira",
        dataDeIncorporacao: "2015-03-15",
        cargo: "inspetor"
    }
];

/**
 * Retorna todos os agentes, com possibilidade de filtrar e ordenar.
 * @param {string} cargo - Cargo para filtrar os agentes.
 * @param {string} sort - Campo e direção para ordenação (ex: 'dataDeIncorporacao' ou '-dataDeIncorporacao').
 * @returns {Array} - Lista de agentes.
 */
function findAll(cargo, sort) {
    let agentesFiltrados = [...agentes];

    // Aplica o filtro por cargo, se fornecido
    if (cargo) {
        agentesFiltrados = agentesFiltrados.filter(a => a.cargo.toLowerCase() === cargo.toLowerCase());
    }

    // Aplica a ordenação, se fornecida
    if (sort) {
        const descending = sort.startsWith('-');
        const sortField = descending ? sort.substring(1) : sort;

        if (sortField === 'dataDeIncorporacao') {
            agentesFiltrados.sort((a, b) => {
                const dateA = new Date(a.dataDeIncorporacao);
                const dateB = new Date(b.dataDeIncorporacao);
                return descending ? dateB - dateA : dateA - dateB;
            });
        }
    }

    return agentesFiltrados;
}

/**
 * Busca um agente pelo seu ID.
 * @param {string} id - O ID do agente.
 * @returns {Object|undefined} - O objeto do agente ou undefined se não for encontrado.
 */
function findById(id) {
    return agentes.find(a => a.id === id);
}

/**
 * Cria um novo agente.
 * @param {Object} agenteData - Os dados do novo agente.
 * @returns {Object} - O agente recém-criado.
 */
function create(agenteData) {
    const novoAgente = { id: uuidv4(), ...agenteData };
    agentes.push(novoAgente);
    return novoAgente;
}

/**
 * Atualiza um agente existente (completo ou parcial).
 * @param {string} id - O ID do agente a ser atualizado.
 * @param {Object} dadosAtualizados - Os novos dados do agente.
 * @returns {Object|null} - O agente atualizado ou null se não for encontrado.
 */
function update(id, dadosAtualizados) {
    const index = agentes.findIndex(a => a.id === id);
    if (index === -1) {
        return null;
    }
    // Mescla os dados existentes com os novos dados
    agentes[index] = { ...agentes[index], ...dadosAtualizados };
    return agentes[index];
}

/**
 * Remove um agente pelo seu ID.
 * @param {string} id - O ID do agente a ser removido.
 * @returns {boolean} - True se o agente foi removido, false caso contrário.
 */
function remove(id) {
    const index = agentes.findIndex(a => a.id === id);
    if (index === -1) {
        return false;
    }
    agentes.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
