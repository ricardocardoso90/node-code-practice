const express = require('express');
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Teste de API!!");
});

app.post('/createproduct', (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  console.log(`Nome: ${name}, preço: ${price}`);
  res.json({ message: "Dados enviados com sucesso!!" });
});

app.listen(3000, () => console.log("Servidor rodando com sucesso!!"));