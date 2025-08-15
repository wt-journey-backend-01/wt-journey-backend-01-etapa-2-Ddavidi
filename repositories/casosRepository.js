const { v4: uuidv4 } = require('uuid'); // Para gerar IDs únicos

// Casos
const casos = [
  {
    id: uuidv4(),
    titulo: "Homicídio",
    descricao: "Disparos foram reportados no Barreiro, resultando na morte de um homem de 45 anos.",
    status: "aberto",
    agente_id: uuidv4()
  }
];

// Funções
function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(c => c.id === id);
}

function create(caso) {
    const novoCaso = {id: uuidv4(), ...caso};
    casos.push(novoCaso);
    return novoCaso;
}

function update(id, dadosAtualizados){
    const caso = findById(id);
    if(!caso) return null;
    Object.assign(caso, dadosAtualizados);
    return caso;
}

function remove(id) {
    const index = casos.findIndex(c => c.id === id);
    if(index === -1) return false;
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