const express = require('express');
const router = express.Router();
const {
  addCategory,
  removeCategory,
  getAllCategories,
  updateCategory,
} = require('../controllers/categoryController.js');

// Route to add a category
// http://localhost:8090/api/addcategory
router.post('/addcategory', addCategory);

// Route to remove a category by ID
router.delete('/removecategory/:id', removeCategory);

// Route to get all categories
// http://localhost:8090/api/allcategory
router.get('/allcategory', getAllCategories);

// Route to update a category by ID
router.put('/update/:id', updateCategory);

module.exports = router;