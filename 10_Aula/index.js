const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.render("Olá Mundão!!");
});

app.listen(3000, () => console.log("Servidor rodando com sucesso!!"));