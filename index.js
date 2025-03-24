const path = require("path");
const express = require("express");
const exphbs = require('express-handlebars');

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

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  // res.sendFile(`${basePath}/index.html`)
  res.render('home');
  // res.render('./views/layouts/main.handlebars', { layout: false });
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