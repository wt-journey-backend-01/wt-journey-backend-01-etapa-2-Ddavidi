// Importa o framework Express
const express = require('express');

// Inicializa a aplicação Express
const app = express();
const PORT = 3000; // Porta fixa, sem depender de dotenv

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

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
});