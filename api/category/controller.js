const Category = require('./model');
const { connect } = require('mongoose');
require('dotenv').config();

const getAllCategories = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const allCategories = await Category.find();
    res.json({
      categories: allCategories,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}


const getCategoryByID = async (req, res) => {
  const { _id } = req.query;
  try {
    await connect(process.env.MONGO_URI);
    const category = await Category.findOne({ _id });
    res.json({ category });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const createCategory = async (req, res) => {
  const { CategoryName, CategoryImage } = req.body;
  if (!CategoryName || !CategoryImage) {
    res.status(403).json({
      message: "Missing Required Field",
    });
  } else {
    try {
      await connect(process.env.MONGO_URI);
      const checkExisting = await Category.exists({ CategoryName });

      if (checkExisting) {
        res.status(400).json({
          message: "Category Already Exists",
        });
      } else {
        await Category.create({ CategoryName, CategoryImage });
        const allCategories = await Category.find();
        res.json({
          message: "Category Created Successfully",
          categories: allCategories,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

const updateCategory = async (req, res) => {
  const { _id, CategoryName } = req.body;
  const filter = { _id };
  const update = { CategoryName };

  try {
    await connect(process.env.MONGO_URI);
    await Category.findOneAndUpdate(filter, update, {
      new: true,
    });
    const categories = await Category.find(); // Changed variable name to "categories"
    res.json({
      message: "Category Updated Successfully",
      categories, // Changed key to "categories"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const deleteCategory = async (req, res) => {
  const { _id } = req.body;
  try {
    await connect(process.env.MONGO_URI);
    await Category.deleteOne({ _id });
    const categories = await Category.find(); // Changed variable name to "categories"
    res.status(200).json({
      message: "Category Deleted Successfully",
      categories, // Changed key to "categories"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = { getAllCategories, getCategoryByID, createCategory, updateCategory, deleteCategory };
