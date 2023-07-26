const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');
const { authorization } = require('../middlewares/authorization.middleware');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API endpoints for managing products.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the product.
 *           example: 6123456789abcdef01234567
 *         title:
 *           type: string
 *           description: The title of the product.
 *           example: Product A
 *         price:
 *           type: number
 *           description: The price of the product.
 *           example: 29.99
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: This is Product A
 *         availability:
 *           type: boolean
 *           description: The availability of the product.
 *           example: true
 *         category:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The ID of the category.
 *               example: 6123456789abcdef01234567
 *             name:
 *               type: string
 *               description: The name of the category.
 *               example: Category A
 *         required:
 *           - title
 *           - price
 *           - availability
 *           - category
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: [] # Use JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               availability:
 *                 type: boolean
 *               category:
 *                 type: string
 *             required:
 *               - title
 *               - price
 *               - availability
 *               - category
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product created successfully.
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid category ID. Category not found.
 *       401:
 *         description: Unauthorized. Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products with category ID and name only (no descriptions)
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of products with category ID and name only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns the product details with category ID and name only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /product/category/{categoryId}:
 *   get:
 *     summary: Get all products of a single category with category ID and name only (no descriptions)
 *     tags: [Product]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of products with category ID and name only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid category ID. Category not found.
 *       500:
 *         description: Internal server error.
 */

// Protected route: Create a new product (Only admin access)
router.post('/create', authMiddleware, authorization(['admin']), productController.createProduct);

// Public route: Get all products with category ID and name only (no descriptions)
router.get('/all', productController.getAllProducts);

// Public route: Get a single product with category ID and name only (no descriptions)
router.get('/:id', productController.getSingleProduct);

// Public route: Get all products of a single category with category ID and name only (no descriptions)
router.get('/category/:categoryId', productController.getProductsByCategory);

module.exports = router;
