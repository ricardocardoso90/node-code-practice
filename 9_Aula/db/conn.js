const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/firstmongodb');
  console.log("Conectou ao MongoDB/Mongoose com sucesso!!");
};

main()
  .catch(error => console.log(error));

module.exports = mongoose;