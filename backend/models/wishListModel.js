const mongoose = require('mongoose');

// Wishlist Schema
const wishlistSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
  }, { timestamps: true });
  
  const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
   
  