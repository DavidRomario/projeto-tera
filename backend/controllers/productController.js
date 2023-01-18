const productSchema = require("../mongoModels/productsModel");

async function getAllProducts(req, res) {
  try {
    const products = await productSchema.find();

    return res.status(200).json({
      success: true,
      message: "",
      payload: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      payload: [],
      message: "error on api",
    });
  }
}

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        payload: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product found",
      payload: [product],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
};

const createProduct = async (req, res) => {
  //
};

const updateProduct = async (req, res) => {
  //
};

const deleteProduct = async (req, res) => {
  //
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
