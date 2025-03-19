const Review = require('../models/reviewModel.js');

// Add Review
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    if (!productId || !rating) {
      return res.status(400).json({ msg: 'Product ID and rating are required.' });
    }

    const newReview = new Review({
      productId,
      userId,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json({ msg: 'Review added successfully.', review: newReview });
  } catch (err) {
    res.status(500).json({ msg: 'Server error.', error: err.message });
  }
};

// Get Reviews for a Product
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).populate('userId', 'name email');

    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ msg: 'Server error.', error: err.message });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found.' });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({ msg: 'You are not authorized to delete this review.' });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ msg: 'Review deleted successfully.' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error.', error: err.message });
  }
};

module.exports = {
  addReview,
  getReviews,
  deleteReview
};
