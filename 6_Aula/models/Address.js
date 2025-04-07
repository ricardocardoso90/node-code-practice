const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const User = require("./User");

const Address = db.define("Address", {
  street: {
    type: DataTypes.STRING,
    require: true,
  },
  number: {
    type: DataTypes.STRING,
    require: true,
  },
  city: {
    type: DataTypes.STRING,
    require: true,
  }
});

Address.belongsTo(User);

module.exports = Address;