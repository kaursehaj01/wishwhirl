const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/jwtAuth.js');
const {
  addToCart,
  removeFromCart,
  getCart,
} = require('../controllers/cartController.js');

router.post('/addtocart', verifyToken, addToCart);
router.post('/removefromcart', verifyToken, removeFromCart);
router.get('/getcart', verifyToken, getCart);

module.exports = router;
// const express = require('express');
// const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
// const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes

// const router = express.Router();

// // Protect the routes with authentication middleware
// router.get('/cart', authMiddleware, getCart); // Fetch the user's cart
// router.post('/cart/add', authMiddleware, addToCart); // Add item to the cart
// router.post('/cart/remove', authMiddleware, removeFromCart); // Remove item from the cart

// module.exports = router;
