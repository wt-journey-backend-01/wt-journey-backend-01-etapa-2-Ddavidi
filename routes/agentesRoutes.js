const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

/**
 * @swagger
 * tags:
 * name: Agentes
 * description: Gerenciamento de agentes policiais
 */

/**
 * @swagger
 * components:
 * schemas:
 * Agente:
 * type: object
 * required:
 * - nome
 * - dataDeIncorporacao
 * - cargo
 * properties:
 * id:
 * type: string
 * description: O ID gerado automaticamente para o agente
 * nome:
 * type: string
 * description: Nome do agente
 * dataDeIncorporacao:
 * type: string
 * format: date
 * description: Data de incorporação do agente no formato YYYY-MM-DD
 * cargo:
 * type: string
 * description: Cargo do agente (ex: delegado, inspetor)
 * example:
 * id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
 * nome: "Rommel Carneiro"
 * dataDeIncorporacao: "1992-10-04"
 * cargo: "delegado"
 */

/**
 * @swagger
 * /agentes:
 * get:
 * summary: Lista todos os agentes
 * tags: [Agentes]
 * parameters:
 * - in: query
 * name: cargo
 * schema:
 * type: string
 * description: Filtra agentes por cargo
 * - in: query
 * name: sort
 * schema:
 * type: string
 * description: Ordena por data de incorporação ('dataDeIncorporacao' para ascendente, '-dataDeIncorporacao' para descendente)
 * responses:
 * 200:
 * description: Lista de agentes
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Agente'
 */
router.get("/", agentesController.getAllAgentes);

/**
 * @swagger
 * /agentes/{id}:
 * get:
 * summary: Retorna um agente específico pelo ID
 * tags: [Agentes]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do agente
 * responses:
 * 200:
 * description: Detalhes do agente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Agente'
 * 404:
 * description: Agente não encontrado
 */
router.get("/:id", agentesController.getAgenteById);

/**
 * @swagger
 * /agentes:
 * post:
 * summary: Cria um novo agente
 * tags: [Agentes]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Agente'
 * responses:
 * 201:
 * description: Agente criado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Agente'
 * 400:
 * description: Dados inválidos
 */
router.post("/", agentesController.createAgente);

/**
 * @swagger
 * /agentes/{id}:
 * put:
 * summary: Atualiza todos os dados de um agente
 * tags: [Agentes]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do agente
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Agente'
 * responses:
 * 200:
 * description: Agente atualizado com sucesso
 * 400:
 * description: Dados inválidos
 * 404:
 * description: Agente não encontrado
 */
router.put("/:id", agentesController.updateAgente);

/**
 * @swagger
 * /agentes/{id}:
 * patch:
 * summary: Atualiza parcialmente os dados de um agente
 * tags: [Agentes]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do agente
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Agente'
 * responses:
 * 200:
 * description: Agente atualizado com sucesso
 * 400:
 * description: Dados inválidos
 * 404:
 * description: Agente não encontrado
 */
router.patch("/:id", agentesController.updatePartialAgente);

/**
 * @swagger
 * /agentes/{id}:
 * delete:
 * summary: Remove um agente
 * tags: [Agentes]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do agente
 * responses:
 * 204:
 * description: Agente removido com sucesso
 * 404:
 * description: Agente não encontrado
 */
router.delete("/:id", agentesController.deleteAgente);

module.exports = router;
