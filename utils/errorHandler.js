// Middleware de tratamento de erros genérico
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Algo deu errado!',
    error: err.message
  });
}

// Exporta a função para uso no server.js
module.exports = errorHandler;