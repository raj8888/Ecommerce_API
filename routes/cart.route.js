const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');

// Protected route: Add a product to the cart
router.post('/add', authMiddleware, cartController.addToCart);

// Protected route: View the user's cart
router.get('/view', authMiddleware, cartController.viewCart);

// Protected route: Increase the quantity of a product in the cart
router.put('/update', authMiddleware, cartController.updateCartItem);

// Protected route: Remove an item from the cart
router.delete('/remove/:productId', authMiddleware, cartController.removeItemFromCart);

module.exports = router;
