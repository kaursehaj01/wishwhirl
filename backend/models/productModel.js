const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
    },
    images:[ {
      type: String,
      required: true,
    }],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    colors: [{ 
      type: String, // Colors will be stored as strings (e.g., "red", "blue")
      required: false, // Optional field
  }],
  sizes: [{ 
    type: String, // Array of sizes (e.g., "S", "M", "L", "XL")
    required: false, 
}],
 brand: {
  type: String, 
  required: false, 
  },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  
  const Product = mongoose.model('Product', productSchema);

module.exports = Product;
