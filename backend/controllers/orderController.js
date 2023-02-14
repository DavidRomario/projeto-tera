const orderSchema = require("../mongoModels/orderModel");
const models = require("../models/index");

async function getOrdersByUserId(req, res) {
  try {
    const userId = req.params.id;
    const order = await orderSchema.find({
      user_id: parseInt(userId),
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        payload: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order found",
      payload: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

async function createOrder(req, res) {
  try {
    const body = req.body;
    const order = new orderSchema();
    const status = "Aprovado";
    const number = Math.floor(Math.random() * 1000000000);

    const verifyUser = await models.User.findOne({
      where: { id: parseInt(body.user_id) },
    });
    if (!verifyUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: [],
      });
    }

    order.status = status;
    order.number = `#${number}`;
    order.products = body.products;
    order.totalValue = body.totalValue;
    order.user_id = body.user_id;

    const saveOrder = await order.save();
    return res.status(200).json({
      success: true,
      payload: [saveOrder],
      message: "Order created with success.",
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

async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const status = "Cancelado";

    await orderSchema.updateOne(
      { _id: orderId },
      {
        status: status,
      }
    );

    return res.status(200).json({
      success: true,
      payload: [],
      message: "Order cancel with success.",
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

module.exports = { getOrdersByUserId, createOrder, updateOrder };
