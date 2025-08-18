const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

/**
 * @swagger
 * tags:
 * name: Casos
 * description: Gerenciamento de casos policiais
 */

/**
 * @swagger
 * components:
 * schemas:
 * Caso:
 * type: object
 * required:
 * - titulo
 * - descricao
 * - status
 * - agente_id
 * properties:
 * id:
 * type: string
 * description: O ID gerado automaticamente para o caso
 * titulo:
 * type: string
 * description: Título do caso
 * descricao:
 * type: string
 * description: Descrição detalhada do caso
 * status:
 * type: string
 * description: Status do caso
 * enum: [aberto, solucionado]
 * agente_id:
 * type: string
 * description: ID do agente responsável pelo caso
 * example:
 * id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46"
 * titulo: "homicidio na Savassi"
 * descricao: "Disparos foram reportados às 22:33..."
 * status: "aberto"
 * agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
 */

/**
 * @swagger
 * /casos:
 * get:
 * summary: Lista todos os casos
 * tags: [Casos]
 * parameters:
 * - in: query
 * name: agente_id
 * schema:
 * type: string
 * description: Filtra casos por ID do agente responsável
 * - in: query
 * name: status
 * schema:
 * type: string
 * enum: [aberto, solucionado]
 * description: Filtra casos por status
 * - in: query
 * name: q
 * schema:
 * type: string
 * description: Busca casos por palavra-chave no título ou descrição
 * responses:
 * 200:
 * description: Lista de casos
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Caso'
 */
router.get('/', casosController.getAllCasos);

/**
 * @swagger
 * /casos/{id}:
 * get:
 * summary: Retorna um caso específico pelo ID
 * tags: [Casos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do caso
 * responses:
 * 200:
 * description: Detalhes do caso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Caso'
 * 404:
 * description: Caso não encontrado
 */
router.get('/:id', casosController.getCasoById);

/**
 * @swagger
 * /casos/{caso_id}/agente:
 * get:
 * summary: Retorna os dados do agente responsável por um caso
 * tags: [Casos]
 * parameters:
 * - in: path
 * name: caso_id
 * schema:
 * type: string
 * required: true
 * description: ID do caso
 * responses:
 * 200:
 * description: Detalhes do agente responsável
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Agente'
 * 404:
 * description: Caso ou agente não encontrado
 */
router.get('/:caso_id/agente', casosController.getAgenteByCasoId);

/**
 * @swagger
 * /casos:
 * post:
 * summary: Cria um novo caso
 * tags: [Casos]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Caso'
 * responses:
 * 201:
 * description: Caso criado com sucesso
 * 400:
 * description: Dados inválidos
 */
router.post('/', casosController.createCaso);

/**
 * @swagger
 * /casos/{id}:
 * put:
 * summary: Atualiza todos os dados de um caso
 * tags: [Casos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do caso
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Caso'
 * responses:
 * 200:
 * description: Caso atualizado com sucesso
 * 400:
 * description: Dados inválidos
 * 404:
 * description: Caso não encontrado
 */
router.put('/:id', casosController.updateCaso);

/**
 * @swagger
 * /casos/{id}:
 * patch:
 * summary: Atualiza parcialmente os dados de um caso
 * tags: [Casos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do caso
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Caso'
 * responses:
 * 200:
 * description: Caso atualizado com sucesso
 * 400:
 * description: Dados inválidos
 * 404:
 * description: Caso não encontrado
 */
router.patch('/:id', casosController.updatePartialCaso);

/**
 * @swagger
 * /casos/{id}:
 * delete:
 * summary: Remove um caso
 * tags: [Casos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do caso
 * responses:
 * 204:
 * description: Caso removido com sucesso
 * 404:
 * description: Caso não encontrado
 */
router.delete('/:id', casosController.deleteCaso);

module.exports = router;
