const express = require('express');
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Teste de API!!");
});

app.post('/createproduct', (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name) {
    res.status(422).json({ message: "Algo deu errado!!" });
    return
  };

  console.log(`Nome: ${name}, preço: ${price}`);
  res.status(201).json({ message: "Dados enviados com sucesso!!" });
});

app.listen(3000, () => console.log("Servidor rodando com sucesso!!"));