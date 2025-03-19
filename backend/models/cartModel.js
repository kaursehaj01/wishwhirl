const mongoose = require('mongoose');

// Cart Schema
const cartSchema = new mongoose.Schema({
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
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  }, { timestamps: true });
  
  const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;


