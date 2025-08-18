/**
 * Middleware para tratamento de erros.
 * Captura erros que ocorrem na aplicação e envia uma resposta padronizada.
 * @param {Error} err - O objeto de erro.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @param {NextFunction} next - A próxima função de middleware.
 */
function errorHandler(err, req, res, next) {
  // Loga o erro no console para fins de depuração
  console.error(err.stack);

  // Envia uma resposta de erro genérica para o cliente
  res.status(500).json({ message: "Ocorreu um erro inesperado no servidor.", error: err.message });
}

module.exports = errorHandler;
