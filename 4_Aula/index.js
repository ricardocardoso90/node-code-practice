const express = require('express');
const app = express();

const pool = require('./db/conn');
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

  const querySql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ['title', 'pageqty', title, pageqty];

  pool.query(querySql, data, (error) => {
    error
      ? console.log(error)
      : res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const querySqlReq = "SELECT * FROM books";

  pool.query(querySqlReq, (error, data) => {
    error && console.log(error);
    const books = data;

    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  const querySqlId = `SELECT * FROM books WHERE ??=?`;
  const data = ['id', id];

  pool.query(querySqlId, data, (error, data) => {
    error && console.log(error);
    const book = data[0];

    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;

  const querySqlId = `SELECT * FROM books WHERE ??=?`;
  const data = ['id', id];

  pool.query(querySqlId, data, (error, data) => {
    error && console.log(error);
    const book = data[0];

    res.render("editbook", { book });
  });
});

app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const querySqlUp = `UPDATE books SET ??=?, ??=? WHERE ??=?`;
  const data = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(querySqlUp, data, (error) => {
    error && console.log(error);
    res.redirect("/books");
  });
});

app.post("/books/remove/:id", (req, res) => {
  const id = req.params.id;

  const querySqlId = `DELETE FROM books WHERE ??=?`;
  const data = ['id', id];

  pool.query(querySqlId, data, (error) => {
    error && console.log(error);
    res.redirect("/books");
  });
});

app.listen(3000);