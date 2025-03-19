const Product = require('../models/productModel.js')
const Category = require('../models/categoryModel.js')
const uploads = require('../middleware/multerMid.js');
require('dotenv').config();

//upload multiple image
// http://localhost:8090/api/upload
const uploadImages = async(req, res)=>{
    try {
      // Assuming the field name for multiple files is 'products'
    uploads.array('images', 10)(req, res, (err) => {  // You can adjust the limit (e.g., 10) as needed
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: 0, msg: 'No files uploaded' });
      }
  
      const port = process.env.PORT || 3000;
      const imageUrls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);
        // Respond with the URLs of the uploaded images
  
      res.status(200).json({
        success: 1,
        imageurls: imageUrls,
        message: 'Images uploaded successfully', 

      });
    });
       
      } catch (error) {
        res.status(500).json({ 
          message: 'Image upload failed', 
          error: error.message 
        });
      }

}

// product controllers

// Addproduct (multiple images)
// http://localhost:8090/api/addproduct
const addProduct = async(req,res)=>{
    try {
       
        const { name, price, category, description, stock, images, old_price, colors, sizes, brand } = req.body;
  
        // Validate category ID
        // const existingCategory = await Category.findById(category);
        // if (!existingCategory) {
        //   return res.status(400).json({ msg: 'Invalid category ID' });
        // }
    
        // Ensure images are in an array format if only one image is passed
        // const imagesArray = Array.isArray(images) ? images : [images];
        const imagesArray = Array.isArray(images) ? images : JSON.parse(images);
        const newProduct = new Product({
          name,
          price,
          old_price,
          category,
          description,
          images: imagesArray,
          stock,
          colors,
          sizes,
          brand,
        });
        // { "success": true, "message": "Product added successfully" }

        await newProduct.save();
        res.status(201).json({ "success":true, message: 'Product added successfully', product: newProduct });
      } catch (error) {
        res.status(500).json({ message: 'Failed to add product', error: error.message });
      }
}

// http://localhost:8090/api/removeproduct/6791cdc235bd61e1129b0be6
// remove product
const removeProduct = async(req,res)=>{
    try {
        const { id } = req.params;
    
        // await Product.findByIdAndDelete(id);
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product removed successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to remove product', error: error.message });
      }
}

//get all product
// http://localhost:8090/api/allproducts
const allProduct = async(req,res)=>{
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
      }
}

// updateproduct

const updateProduct = async(req,res)=>{
    try {
        const { id } = req.params;
        const updates = req.body;
    
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
      } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
      }
}

//newcollection -->the last 8 product which we add are shown as newcollection 
// http://localhost:8090/api/newcollections
const newCollection = async(req, res)=>{
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch new collection', error: error.message });
      }
} 

// popular in women based on category women
// http://localhost:8090/api/popularinwomen
const popularInWomen = async(req,res)=>{
    try {
        const category = await Category.findOne({ name: 'WomenClothes' });
    
        if (!category) {
          return res.status(404).json({ message: 'Women category not found' });
        }
    
        const products = await Product.find({ category: category._id }).limit(10);
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch popular products', error: error.message });
      }
}

module.exports = {uploadImages,addProduct,
  removeProduct,allProduct,updateProduct, newCollection, popularInWomen};

  // http://localhost:8090/api/upload
// const uploadImages = async(req, res)=>{
//   try {
//     console.log('req.files:', req.files); // Debugging: Check the uploaded files

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

// }

// // product controllers

// // Addproduct (multiple images)
// const addProduct = async(req,res)=>{
//   try {
//     console.log(req.files, "kkkk"); 
//       const { name, price, old_price, category, description, stock, colors, sizes, brand } = req.body;
//       const images = req.files.map(file => file.path); // Handle uploaded images
//    // Check if images are uploaded
//    if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ message: 'No images uploaded' });
//   }

//   // Process uploaded images
//   // const Images = req.files.map((file) => file.path.replace(/\\/g, '/')); // Convert backslashes to forward slashes for consistency

//       const newProduct = new Product({
//         name,
//         price,
//         old_price,
//         category,
//         description,
//         images: Images,
//         stock,
//         colors,
//         sizes,
//         brand,
//       });
  
//       await newProduct.save();
//       res.status(201).json({ message: 'Product added successfully', product: newProduct });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to add product', error: error.message });
//     }
// }