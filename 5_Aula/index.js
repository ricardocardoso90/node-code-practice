const express = require('express');
const app = express();

const conn = require('./db/conn');
const exphbs = require('express-handlebars');

const User = require('./models/User');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/users/create", (req, res) => {
  res.render("addusers");
});

app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  newsletter === 'on'
    ? newsletter = true
    : newsletter = false;

  console.log(req.body);
  await User.create({ name, occupation, newsletter });

  res.redirect('/');
});

conn.sync()
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));