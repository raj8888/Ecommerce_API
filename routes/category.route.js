const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');
const { authorization } = require('../middlewares/authorization.middleware');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API endpoints for managing categories.
 */

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category(Only admin have access)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: [] # Use JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created successfully.
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Category with this name already exists.
 *       401:
 *         description: Unauthorized. Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /category/all/description:
 *   get:
 *     summary: Get all categories with all information
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of categories with full details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns the category details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /category/all/names:
 *   get:
 *     summary: Get all categories with names and IDs only (no descriptions)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successful operation. Returns an array of categories with names and IDs only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6123456789abcdef01234567
 *                       name:
 *                         type: string
 *                         example: Category A
 *       500:
 *         description: Internal server error.
 */

module.exports = router;
