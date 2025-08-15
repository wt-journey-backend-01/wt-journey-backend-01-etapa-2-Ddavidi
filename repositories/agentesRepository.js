const { v4: uuidv4 } = require('uuid');

// Agentes
const agentes = [
    {
        id: uuidv4(),
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado" 
    }
];

// Funções
function findAll(){
    return agentes;
}

function findById(id){
    return agentes.find(a => a.id === id);
}

function create(agente) {
    const novoAgente = {id: uuidv4(), ...agente};
    agentes.push(novoAgente);
    return novoAgente;
}

function update(id, dadosAtualizados){
    const agente = findById(id);
    if(!agente) return null;
    Object.assign(agente, dadosAtualizados);
    return agente;
}

function remove(id) {
    const index = agentes.findIndex(a => a.id === id);
    if(index === -1) return false;
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