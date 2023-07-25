const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authMiddleware } = require('../middlewares/authentication.middleware');
const {authorization}=require("../middlewares/authorization.middleware")

router.use(authMiddleware)

router.post('/create',authorization(['admin']), categoryController.createCategory);

router.get('/all', categoryController.getAllCategories);

router.get('/:id', categoryController.getSingleCategory);

module.exports = router;
