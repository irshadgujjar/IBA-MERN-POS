const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("./controller");

router.get("/get-all-categories", getAllCategories);
router.get("/get-category-by-id", getCategoryByID);
router.post("/create-category", createCategory);
router.put("/update-category", updateCategory);
router.delete("/delete-category", deleteCategory);

module.exports = router;
