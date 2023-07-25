const Category = require('../models/category.model');
const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
  try {
    // Only allow admin users to create products

    const { title, price, description, availability, category } = req.body;

    // Check if the category ID exists in the database
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ error: 'Invalid category ID. Category not found.' });
    }

    // Create a new product instance and save it to the database
    const newProduct = new Product({
      title,
      price,
      description,
      availability,
      category,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully.', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Retrieve all products with category ID and name only
    const products = await Product.find({}, 'title price description availability category').populate('category', 'name');

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID and populate the category field with name only
    const product = await Product.findById(productId, 'title price description availability').populate('category', 'name');

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getProductsByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
  
      // Check if the category ID exists in the database
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        return res.status(400).json({ error: 'Invalid category ID. Category not found.' });
      }
  
      // Retrieve all products of the given category with category ID and name only (no descriptions)
      const products = await Product.find({ category: categoryId }, 'title price availability category').populate('category', 'name');
  
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
};
