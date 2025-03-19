const express = require('express');
const { 

  addReview, 
  getReviews, 
  deleteReview

} = require('../controllers/reviewController.js');
const {verifyToken} = require('../middleware/jwtAuth.js')

const router = express.Router();


// Review Routes
router.post('/review', verifyToken, addReview);
router.get('/reviews/:productId', getReviews);
router.delete('/deleteReview', verifyToken, deleteReview);

module.exports = router;
