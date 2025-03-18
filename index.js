import chalk from "chalk";
import express from "express";

const app = express();
const PORT = 3000;

const checkUsers = (req, res, next) => {
  req.authStatus = true;

  req.authStatus
    ? console.log(chalk.bgGreen.black("Você está logado!!"))
    : console.log(chalk.bgRed.black("Você não está logado, faça login para continuar!!"))

  next();
};

app.use(checkUsers);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users/:params", (req, res) => {
  res.send("Página de usuários!!");

  console.log(chalk.green("Buscando usuário..."));
  console.log(req.params);
});

app.listen(PORT, () => {
  console.log(chalk.green(`Servidor rodando na porte ${PORT}.`));
});