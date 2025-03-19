const Cart = require('../models/cartModel.js');
const Product = require('../models/productModel.js');  
const mongoose = require('mongoose');

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { items } = req.body;
    console.log("product id at cart controller",items);
    const userId = req.user.id;  // Assuming you're using middleware to set req.user


   // Ensure items is an array and not empty
   if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items array is required' });
  }
  let cart = await Cart.findOne({user: userId});
  if(cart){
    for(const{productId, quantity} of items){
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message:  `Product with ID ${productId} not found`  });
    }
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      // const itemIndex = cart.items.findIndex(item => item.productId.toString() === new mongoose.Types.ObjectId(productId).toString());

      if (itemIndex > -1) {
        // If product exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ productId, quantity });
      }
    }
    } else {
      // Create a new cart if none exists
      cart = new Cart({
        user: userId,
        items,
      });
    }

    // Save the cart
    await cart.save();
    const populatedCart = await cart.populate('items.productId');

    res.status(200).json({ message: 'Product added to cart', cart: populatedCart});
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("productkskfkfs", productId);
    const userId = req.user.id;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log("Cart items before removal:", cart.items);
    console.log("Product ID to remove:", productId);

    // Remove product from cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

 // Remove product from cart abhi new
//  cart.items = cart.items.filter(item => 
//   item.productId.toString() !== productId.toString()
// );


    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
  }
};

// Get cart data
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ user: userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cart data', error: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};



