const casosRepository = require('../repositories/casosRepository');

// Listar todos os casos
function getAllCasos(req, res) {
    const casos = casosRepository.findAll();
    res.status(200).json(casos);
}

// Buscar caso por ID
function getCasoById(req, res) {
    const { id } = req.params;
    const caso = casosRepository.findById(id);
    
    if(!caso) {
        return res.status(404).json({status: 404, message: "Caso não encontrado"});
    }

    res.status(200).json(caso);
}

// Criar novo caso