const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints for managing the user's cart.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the cart.
 *           example: 6171c84c0f85792123456789
 *         user:
 *           type: string
 *           description: The ID of the user associated with the cart.
 *           example: 6171c84c0f85792123456789
 *         products:
 *           type: array
 *           description: The list of products in the cart.
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the cart item.
 *                 example: 6171c84c0f85792123456789
 *               product:
 *                 $ref: '#/components/schemas/Product'
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product in the cart.
 *                 example: 2
 *       required:
 *         - user
 *         - products
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the cart.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart.
 *     responses:
 *       201:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid product ID. Product not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/add', authMiddleware, cartController.addToCart);

/**
 * @swagger
 * /cart/view:
 *   get:
 *     summary: View the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/view', authMiddleware, cartController.viewCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Increase the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product in the cart to update.
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the product in the cart.
 *     responses:
 *       200:
 *         description: Product quantity updated in the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid product ID. Product not found.
 *       404:
 *         description: Product not found in the cart.
 *       500:
 *         description: Internal server error.
 */
router.put('/update', authMiddleware, cartController.updateCartItem);

/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the product to remove from the cart.
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/remove/:productId', authMiddleware, cartController.removeItemFromCart);

module.exports = router;
