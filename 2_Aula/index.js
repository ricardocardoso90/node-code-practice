const express = require('express');
const app = express();

const mysql = require('mysql');
const exphbs = require('express-handlebars');

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

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const querySql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;
  conn.query(querySql, (error) => {
    error
      ? console.log(error)
      : res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const querySqlReq = "SELECT * FROM books";
  conn.query(querySqlReq, (error, data) => {

    error && console.log(error);
    console.log(data);

    res.render("books", { data });
  });
});

const conn = mysql.createConnection({
  host: 'localhost',
  port: 3306,
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