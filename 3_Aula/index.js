const path = require("path");
const express = require("express");
const exphbs = require('express-handlebars');

const router = require("./routes");

// const hbs = exphbs.create({
//   partialsDir: ["views/partials"],
// });

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

app.get("/dashboard", (req, res) => {
  // const games = ["Dark Souls", "eFootball", "Elden Ring", "Demon`s Souls", "Rocket League"];

  const games = [
    { id: 1, nome: "Dark Souls" },
    { id: 2, nome: "eFootball" },
    { id: 3, nome: "Elden Ring" },
    { id: 4, nome: "Demon`s Souls" },
    { id: 5, nome: "Rocket League" }
  ];

  res.render('dashboard', { games });
});

app.get("/blogpost", (req, res) => {
  const post = {
    title: "Aula de NODEJS",
    category: "JavaScript",
    body: "Aulas para aprender BackEnd com NodeJS!",
  }

  res.render('blogpost', { post });
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/", (req, res) => {
  const isLoaded = true;

  const user = {
    name: "Ricardo",
    surname: "Cardoso"
  };

  res.render('home', { user, isLoaded });
  // res.sendFile(`${basePath}/index.html`)
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