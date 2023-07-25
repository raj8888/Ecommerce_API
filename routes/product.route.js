const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');
const { authorization } = require('../middlewares/authorization.middleware');

// Protected route: Create a new product (Only admin access)
router.post('/create', authMiddleware, authorization(['admin']), productController.createProduct);

// Public route: Get all products with category ID and name only (no descriptions)
router.get('/all', productController.getAllProducts);

// Public route: Get a single product with category ID and name only (no descriptions)
router.get('/:id', productController.getSingleProduct);

// Public route: Get all products of a single category with category ID and name only (no descriptions)
router.get('/category/:categoryId', productController.getProductsByCategory);

module.exports = router;
