const express = require('express')
const {uploadImages,addProduct,removeProduct,allProduct,updateProduct, newCollection, popularInWomen} = require('../controllers/productController.js');
const {verifyToken} = require('../middleware/jwtAuth.js')
const uploads = require('../middleware/multerMid.js')

const router = express.Router();

// Product Routes
router.post('/upload',uploadImages);
router.post('/addproduct', uploads.array('images'), addProduct); // Admin only
router.post('/removeproduct/:id',removeProduct); // Admin only
router.get('/allproducts', allProduct);
router.get('/newcollections', newCollection);
router.get('/popularinwomen', popularInWomen);
router.put('/updateproduct/:id',verifyToken,updateProduct)// Admin only

  

module.exports = router