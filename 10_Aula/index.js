const express = require('express');
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Olá Mundão!!");
  // res.json({ message: "Primeira rota criada com sucesso!!" })
});

app.listen(3000, () => console.log("Servidor rodando com sucesso!!"));