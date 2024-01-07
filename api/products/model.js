const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  api_featured_image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product_type: {
    type: String,  
    required: true,
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
