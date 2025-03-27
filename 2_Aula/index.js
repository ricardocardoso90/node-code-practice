const express = require('express');

const mysql = require('mysql');
const exphbs = require('express-handlebars');

const app = express();
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("./public"));


app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
});

conn.connect((error) => {
  error 
  ? console.log(error) 
  : console.log("Conectado ao MySQL")

  app.listen(3000);
});