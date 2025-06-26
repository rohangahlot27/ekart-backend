const express = require('express');
const router = express.Router(); // ✅ Make sure this is here

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct, // ✅ Don't forget this if using delete
} = require('../controllers/productController');

// Routes
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);      // ✅ optional, good to have
router.delete('/:id', deleteProduct);   // ✅ required for delete

module.exports = router;
