const path = require("path");
const express = require("express");
const router = require("./routes");

const app = express();
const PORT = 3000;

const basePath = path.join(__dirname, './templates');

app.use(express.json());
app.use(express.static("./public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

router.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`)
});

app.use((req, res, next) => {
  res.status(404);
  res.sendFile(`${basePath}/error.html`);
});

const checkUsers = (req, res, next) => {
  res.sendFile(`${basePath}/userform.html`);

  req.authStatus = true;
  req.authStatus
    ? console.log("Você está logado!!")
    : console.log("Você não está logado!!")

  next();
};
app.use(checkUsers);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porte ${PORT}.`);
});