const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category with this name already exists.' });
    }

    // Create a new category instance and save it to the database
    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully.', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID in the database
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
