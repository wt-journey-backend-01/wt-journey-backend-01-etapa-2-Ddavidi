const express = require('express')
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de teste
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Servidor rodando!' });
});

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});