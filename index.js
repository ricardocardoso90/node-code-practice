import chalk from "chalk";
import express from "express";

console.log(chalk.green("Starting app in dev mode..."));

const app = express();
const port = 3000;

//req = requisição: são dados que recebemos.
//res = resposta: são dados que enviamos.

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const name = "Ricardo";

app.get("/users", (req, res) => {
  res.send(`Olá, ${name}`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});