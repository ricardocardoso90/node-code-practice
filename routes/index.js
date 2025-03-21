const path = require("path");
const express = require("express");

const router = express.Router();
const basePath = path.join(__dirname, '../templates');

router.get("/users/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

router.post("/users/save", (req, res) => {
  console.log("Dados enviados com sucesso!!");
  console.log(`O nome do usuário é ${req.body.name}, e ele tem ${req.body.idade} anos.`);

  res.sendFile(`${basePath}/userform.html`);
});

router.get("/users/:id", (req, res) => {
  res.send("Página de usuários!!");

  console.log("Buscando usuário...");
});

module.exports = router;