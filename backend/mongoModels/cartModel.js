const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  products: {
    type: Array,
    required: true,
  },
  totalValue: {
    type: Number,
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

module.exports = mongoose.model("cart", cartSchema);
