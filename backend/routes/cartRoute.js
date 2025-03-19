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

