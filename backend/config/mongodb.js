const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI
  ? process.env.MONGO_URI
  : "mongodb://localhost:27017/products";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = { connectDB };
