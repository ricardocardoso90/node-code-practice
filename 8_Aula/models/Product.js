const conn = require('../db/conn');
const { ObjectId } = require('mongodb');

class Product {

  constructor(name, image, price, description) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
  };

  //METODO PARA ENVIAR TODOS OS DADOS.
  save() {
    const product = conn.db().collection('products').insertOne({
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description
    });

    return product;
  };

  //METODO PARA RECUPERAR TODOS OS DADOS.
  static getProducts() {
    const product = conn.db().collection('products').find({}).toArray();

    return product;
  };

  //METODO PARA RECUPERAR APENAS UM DADO.
  static async getProductById(id) {
    const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) });

    return product;
  };

  //METODO PARA DELETAR UM DADO.
  static async deleteProduct(id) {
    const product = await conn.db().collection('products').deleteOne({ _id: new ObjectId(id) });

    return product;
  };
};

module.exports = Product;