const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const conn = require('./db/conn');

const Task = require('./models/Task');
const tasksRoutes = require('./routes/tasksRoutes');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(express.json());
app.use('/tasks', tasksRoutes);
app.use(express.static("./public"));

conn
  .sync()
  // .sync({ force: true })
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));