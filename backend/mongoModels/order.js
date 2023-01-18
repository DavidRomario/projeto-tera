const mongoose = require("mongoose");
const { Json } = require("sequelize/types/utils");

const orderSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  number: {
    type: String,
    required: true,
  },
  totalValue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  products: {
    type: Json,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  deletedAt: {
    type: Date,
    default: null,
    required: false,
  },
});

module.exports = mongoose.model("order", orderSchema);
