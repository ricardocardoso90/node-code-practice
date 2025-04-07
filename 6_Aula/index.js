const express = require('express');
const app = express();

const conn = require('./db/conn');
const exphbs = require('express-handlebars');

const User = require('./models/User');
const Address = require('./models/Address');
// const { raw } = require('mysql');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(express.static("./public"));

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  // console.log(users);

  res.render("home", { users: users });
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

  // console.log(req.body);
  await User.create({ name, occupation, newsletter });

  res.redirect('/');
});

app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render("userview", { user: user });
});

app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } })

  res.render("useredit", { user: user });
});

app.post("/users/update", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  newsletter === 'on'
    ? newsletter = true
    : newsletter = false;

  // const userData = { id, name, occupation, newsletter };
  await User.update(id, name, occupation, newsletter, { where: { id: id } });

  res.redirect("/");
});

app.post("/address/create", async (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  // const addressData = {UserId, street, number, city};
  await Address.create({ UserId, street, number, city });

  res.redirect(`/users/edit/${UserId}`);
});

conn
  .sync()
  // .sync({ force: true })
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));