const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    name: String,
    desciption: String,
    price: Number,
    amount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("Products", Product);
module.exports = products;
