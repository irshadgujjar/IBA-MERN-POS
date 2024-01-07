const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct
} = require('./controller');

router.post('/create-product', createProduct);
router.get('/get-all-products', getAllProducts);
router.get('/get-product-by-id/:productId', getProductById);
router.put('/update-product/:productId', updateProduct);
router.delete('/delete-product/:productId', deleteProduct);

module.exports = router;
