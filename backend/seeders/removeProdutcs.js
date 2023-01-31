const mongodb = require("../config/mongodb");
const ProductsSchema = require("../mongoModels/productsModel");

const removeProducts = async (req, res) => {
  mongodb.connectDB();

  await ProductsSchema.deleteMany();
};

removeProducts();
