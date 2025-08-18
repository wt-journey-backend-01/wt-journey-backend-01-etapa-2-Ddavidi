// Importa o framework Express
const express = require('express');
// Importa as bibliotecas para documentação da API (Swagger)
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Inicializa a aplicação Express
const app = express();
const PORT = 3000;

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// --- Configuração do Swagger ---
// Define as opções para o swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Departamento de Polícia',
      version: '1.0.0',
      description: 'API para gerenciamento de casos e agentes policiais.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  // Caminho para os arquivos que contêm as anotações da API (rotas)
  apis: ['./routes/*.js'],
};

// Gera a especificação do Swagger com base nas opções
const swaggerDocs = swaggerJsdoc(swaggerOptions);
// Serve a documentação da API na rota /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// --- Rotas da Aplicação ---
// Importa os roteadores de agentes e casos
const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');

// Rota de verificação de saúde da API
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Servidor rodando e saudável!' });
});

// Associa os roteadores às suas rotas base
app.use('/agentes', agentesRouter);
app.use('/casos', casosRouter);

// --- Tratamento de Erros ---
// Importa o middleware de tratamento de erros
const errorHandler = require('./utils/errorHandler');
// Registra o middleware de erro (deve ser o último middleware)
app.use(errorHandler);


// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
  console.log(`Documentação da API disponível em http://localhost:${PORT}/docs`);
});
