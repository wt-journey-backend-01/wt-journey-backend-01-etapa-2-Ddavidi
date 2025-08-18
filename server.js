const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de teste
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Servidor rodando!' });
});

// Rota para forçar erro de teste
app.get('/erro', (req, res, next) => {
  const err = new Error("Algo deu errado de propósito!");
  err.status = 500; 
  next(err); // passa o erro para o errorHandler
});

// Importação das rotas
const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');

// Registro das rotas com seus respectivos prefixos
app.use('/agentes', agentesRouter);
app.use('/casos', casosRouter);

// Importação do middleware de erro
const errorHandler = require('./utils/errorHandler');

// Registro do middleware de erro
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});
