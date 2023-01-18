const mongodb = require("../config/mongodb");
const products = require("../config/products");
const ProductsSchema = require("../mongoModels/productsModel");

const createProducts = async (req, res) => {
  mongodb.connectDB();
  const productsList = products.getAllProducts();

  productsList.forEach(async (product) => {
    const Products = new ProductsSchema();

    Products.name = product.name;
    Products.image = product.image;
    Products.price = product.price;
    Products.description = product.description;
    Products.category = product.category;
    Products.billing = product.billing;

    await Products.save();
    console.log("Produtos inseridos com sucesso.");
  });
};

createProducts();
