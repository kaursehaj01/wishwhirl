const Category = require('../models/categoryModel.js')



// Add a category
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add category', error: error.message });
  }
};

// Remove a category
const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove category', error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category', error: error.message });
  }
};

module.exports = { addCategory, removeCategory, getAllCategories, updateCategory };
