const cartSchema = require("../mongoModels/cartModel");

async function getCart(req, res) {
  try {
    const cartId = req.params.id;
    const cart = await cartSchema.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        payload: [],
        message: "Cart not found.",
      });
    } else {
      return res.status(200).json({
        success: true,
        payload: [cart],
        message: "Cart found.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      payload: [],
      message: "error on api",
    });
  }
}

async function createCart(req, res) {
  try {
    const body = req.body;
    const cart = new cartSchema();

    let totalValue = 0;
    body.products.forEach((product) => {
      totalValue += product.price;
    });

    cart.products = body.products;
    cart.totalValue = totalValue;

    const saveCart = await cart.save();
    return res.status(200).json({
      success: true,
      payload: [saveCart],
      message: "Cart created with success.",
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

async function updateCart(req, res) {
  try {
    const body = req.body;
    const cartId = req.params.id;
    const cart = await cartSchema.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        payload: [],
        message: "Cart not found.",
      });
    }

    const products = cart.products;
    products.push(body.products[0]);

    await cartSchema.updateOne(
      {
        _id: cartId,
      },
      {
        products: products,
        totalValue: (cart.totalValue += body.products[0].price),
      }
    );
    const cartUpdate = await cartSchema.findById(cartId);

    return res.status(200).json({
      success: true,
      payload: cartUpdate,
      message: "Cart updated with success.",
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

async function removeProductFromCart(req, res) {
  try {
    const body = req.body;
    const cartId = req.params.id;
    const cart = await cartSchema.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        payload: [],
        message: "Cart not found.",
      });
    }

    const products = cart.products;

    const removeProduct = products.filter(
      (product) => product._id !== body.productId
    );

    let productsUpdated = [];

    let totalValue = 0;
    if (cart.products.length > 0) {
      removeProduct.forEach((product) => {
        totalValue += product.price;
      });
      productsUpdated = removeProduct;
    }

    await cartSchema.updateOne(
      {
        _id: cartId,
      },
      {
        products: productsUpdated,
        totalValue: totalValue,
      }
    );

    const cartUpdate = await cartSchema.findById(cartId);

    return res.status(200).json({
      success: true,
      payload: [cartUpdate],
      message: "Cart updated with success.",
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

async function deleteCart(req, res) {
  try {
    const cartId = req.params.id;
    const cart = await cartSchema.findById(cartId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        payload: [],
        message: "Cart not found.",
      });
    }
    await cartSchema.deleteOne({ _id: cartId });
    return res.status(200).json({
      success: true,
      payload: [],
      message: "Cart deleted with success.",
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

module.exports = {
  getCart,
  createCart,
  updateCart,
  removeProductFromCart,
  deleteCart,
};
