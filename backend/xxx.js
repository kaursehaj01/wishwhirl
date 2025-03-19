










// const Cart = require('../models/cartModel.js');

// // Add product to cart
// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const userId = req.user.id; // Assumes verifyToken sets req.user

//     let cart = await Cart.findOne({ user: userId });

//     if (cart) {
//       // Check if the product already exists in the cart
//       const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//       if (itemIndex > -1) {
//         // Update the quantity if product exists
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         // Add new product
//         cart.items.push({ productId, quantity });
//       }
//     } else {
//       // Create a new cart for the user
//       cart = new Cart({
//         user: userId,
//         items: [{ productId, quantity }],
//       });
//     }

//     await cart.save();
//     res.status(200).json({ message: 'Product added to cart', cart });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
//   }
// };

// // Remove product from cart
// const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const userId = req.user.id;

//     const cart = await Cart.findOne({ user: userId });
//     if (cart) {
//       cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//       await cart.save();
//       return res.status(200).json({ message: 'Product removed from cart', cart });
//     }

//     res.status(404).json({ message: 'Cart not found' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
//   }
// };

// // Get cart data
// const getCartData = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.findOne({ user: userId }).populate('items.productId');
//     res.status(200).json(cart || { message: 'No cart data found' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve cart data', error: error.message });
//   }
// };

// module.exports = {
//   addToCart,
//   removeFromCart,
//   getCartData,
// };









// const Product = require('../models/productModel.js');
// const Category = require('../models/categoryModel.js');
// const uploads = require('../middleware/multerMid.js');

// // Upload multiple images
// const uploadImages = async (req, res) => {
//   try {
//     const imageUrls = req.files.map(file => file.path); // Assuming multer saves images and provides file paths
//     res.status(200).json({ message: 'Images uploaded successfully', imageUrls });
//   } catch (error) {
//     res.status(500).json({ message: 'Image upload failed', error: error.message });
//   }
// };
// const uploadImages = async (req, res) => {
//     try {
//       // Check if files exist in the request
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ message: 'No images were uploaded' });
//       }
  
//       // Process the uploaded files
//       const imageUrls = req.files.map(file => file.path); // Extract paths from the uploaded files
  
//       // Respond with the URLs of the uploaded images
//       res.status(200).json({ 
//         message: 'Images uploaded successfully', 
//         imageUrls 
//       });
//     } catch (error) {
//       res.status(500).json({ 
//         message: 'Image upload failed', 
//         error: error.message 
//       });
//     }
//   };
  

// // Add a product
// const addProduct = async (req, res) => {
//   try {
//     const { name, price, old_price, category, description, stock, colors, sizes, brand } = req.body;
//     const images = req.files.map(file => file.path); // Handle uploaded images

//     const newProduct = new Product({
//       name,
//       price,
//       old_price,
//       category,
//       description,
//       images,
//       stock,
//       colors,
//       sizes,
//       brand,
//     });

//     await newProduct.save();
//     res.status(201).json({ message: 'Product added successfully', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add product', error: error.message });
//   }
// };

// // Remove a product
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await Product.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Product removed successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to remove product', error: error.message });
//   }
// };

// // Get all products
// const allProduct = async (req, res) => {
//   try {
//     const products = await Product.find().populate('category');
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch products', error: error.message });
//   }
// };

// // Update a product
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
//     res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update product', error: error.message });
//   }
// };

// // Get new collection (last 8 added products)
// const newCollection = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 }).limit(8);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch new collection', error: error.message });
//   }
// };

// // Get popular in women (products in category 'women')
// const popularInWomen = async (req, res) => {
//   try {
//     const category = await Category.findOne({ name: 'Women' });

//     if (!category) {
//       return res.status(404).json({ message: 'Women category not found' });
//     }

//     const products = await Product.find({ category: category._id }).limit(10);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch popular products', error: error.message });
//   }
// };

// module.exports = {
//   uploadImages,
//   addProduct,
//   removeProduct,
//   allProduct,
//   updateProduct,
//   newCollection,
//   popularInWomen,
// };
// const Product = require('../models/productModel.js');
// const Category = require('../models/categoryModel.js')
// const path = require('path');
// const upload = require('../middleware/multerMid.js')
// require('dotenv').config();
// const mongoose = require('mongoose');
// const uploadImages = async (req, res) => {
//     // Assuming the field name for multiple files is 'products'
//     upload.array('products', 10)(req, res, (err) => {  // You can adjust the limit (e.g., 10) as needed
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ success: 0, msg: 'No files uploaded' });
//       }
  
//       const port = process.env.PORT || 3000;
//       const imageUrls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);
  
//       res.status(200).json({
//         success: 1,
//         image_urls: imageUrls
//       });
//     });
//   };
  
  
  
//   // Product Controllers
//   const addProduct = async (req, res) => {
//     try {
//       const { name, price, category, description, stock, images, old_price, colors, sizes, brand } = req.body;
  
//       // Validate category ID
//       const existingCategory = await Category.findById(category);
//       if (!existingCategory) {
//         return res.status(400).json({ msg: 'Invalid category ID' });
//       }
  
//       // Ensure images are in an array format if only one image is passed
//       // const imagesArray = Array.isArray(images) ? images : [images];
//       const imagesArray = Array.isArray(images) ? images : JSON.parse(images);
  
  
//       const newProduct = new Product({
//         name,
//         price,
//         category,
//         old_price,
//         description,
//         stock,
//         images: imagesArray, // Store all the image URLs
//         colors,
//         sizes,
//         brand
//       });
  
//       await newProduct.save();
  
//       res.status(201).json({ msg: 'Product added successfully', product: newProduct });
//     } catch (err) {
//       res.status(500).json({ msg: 'Error adding product', error: err.message });
//     }
//   };