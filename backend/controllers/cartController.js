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





// // Add product to cart
// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity =1} = req.body;
//     const userId = req.user.id; // Assumes verifyToken sets req.user

//     let cart = await Cart.findOne({ user: userId });

//     if (cart) {
//       // Check if the product already exists in the cart
//       const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//       if (itemIndex > -1) {
//         // Update the quantity if product exists
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         // Add new product
//         cart.items.push({ productId, quantity });
//       }
//     } else {
//       // Create a new cart for the user
//       cart = new Cart({
//         user: userId,
//         items: [{ productId, quantity }],
//       });
//     }

//     await cart.save();
//     const populatedCart = await cart.populate('items.productId');

//     // res.status(200).json({ message: 'Product added to cart', cart });
//     res.status(200).json({ message: 'Product added to cart',cart: populatedCart });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
//   }
// };

// // Remove product from cart
// const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const userId = req.user.id;

//     const cart = await Cart.findOne({ user: userId });
//     if (cart) {
//       cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//       await cart.save();
//       return res.status(200).json({ message: 'Product removed from cart', cart });
//     }

//     res.status(404).json({ message: 'Cart not found' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
//   }
// };

// // Get cart data
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.findOne({ user: userId }).populate('items.productId');
//     res.status(200).json(cart || { message: 'No cart data found' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve cart data', error: error.message });
//   }
// };

// module.exports = {
//   addToCart,
//   removeFromCart,
//   getCart,
// };

// const Cart = require('../models/cartModel.js');
// const Product = require('../models/Product'); 
// // Get Cart by User
// const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).populate('items.productId', 'name price image');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Add Item to Cart
// const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;

//   try {
//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Find the user's cart
//     let cart = await Cart.findOne({ user: req.user._id });

//     // If no cart exists, create a new one
//     if (!cart) {
//       cart = new Cart({
//         user: req.user._id,
//         items: [{ productId, quantity }],
//       });
//     } else {
//       // If the product already exists in the cart, update the quantity
//       const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ productId, quantity });
//       }
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Remove Item from Cart
// const removeFromCart = async (req, res) => {
//   const { productId } = req.body;

//   try {
//     let cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Remove item from the cart
//     cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { getCart, addToCart, removeFromCart };