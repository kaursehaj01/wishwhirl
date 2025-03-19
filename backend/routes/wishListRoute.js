const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/jwtAuth.js');

const {
  addToWishlist,
  removeFromWishlist,
  getWishlistData} = require('../controllers/wishListController.js')

router.post('/addtowish', verifyToken, addToWishlist);
router.post('/removefromwish', verifyToken, removeFromWishlist);
router.get('/getwish', verifyToken, getWishlistData);

module.exports = router;
