const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

// Rota para listar todos os casos
router.get('/', casosController.getAllCasos);

// Rota para buscar um caso pelo ID
router.get('/:id', casosController.getCasoById);

// Rota para criar um novo caso
router.post('/', casosController.createCaso);

// Rota para atualizar um caso existente
router.put('/:id', casosController.updateCaso);

// Rota para remover um caso
router.delete('/:id', casosController.deleteCaso);

module.exports = router;
