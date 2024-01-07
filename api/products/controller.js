const Product = require("./model");
const { connect } = require("mongoose");
require("dotenv").config();

const createProduct = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    if (typeof req.body.product_type !== 'string') {
      return res.status(400).json({
        message: "Invalid product type. Must be a string.",
      });
    }

    const newProduct = new Product(req.body);

    await newProduct.save();

    const allProducts = await Product.find();
    res.json({
      message: "Product created",
      products: allProducts,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);

    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);

    const allProducts = await Product.find();
    res.json({
      products: allProducts,
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const allProducts = await Product.find();
    res.json({
      message: "Product updated successfully",
      products: allProducts,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);

    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const allProducts = await Product.find();
    res.status(200).json({
      message: "Product deleted successfully",
      products: allProducts,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
