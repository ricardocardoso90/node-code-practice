const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('nodesequelize', 'root', '', {
  host: 'localhost',
  dialect: "mysql",
});

// try {
//   sequelize.authenticate();
//   console.log("Conectado ao sequelize!!");
// } catch (error) {
//   console.log("Não foi possível conectar:", error);
// };

module.exports = sequelize;