const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const conn = require('./db/conn');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(express.json());
app.use(express.static("./public"));

app.listen(3000);