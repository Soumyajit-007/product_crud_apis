const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');


router.route('/')
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router.route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.hardDeleteProduct);

router.route('/:id/soft-delete')
  .delete(productController.softDeleteProduct);

module.exports = router;