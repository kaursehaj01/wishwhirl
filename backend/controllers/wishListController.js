const Wishlist = require('../models/wishListModel.js');

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      // Check if the product already exists in the wishlist
      if (!wishlist.items.some(item => item.productId.toString() === productId)) {
        wishlist.items.push({ productId });
      }
    } else {
      // Create a new wishlist for the user
      wishlist = new Wishlist({
        user: userId,
        items: [{ productId }],
      });
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to wishlist', error: error.message });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
      await wishlist.save();
      return res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    }

    res.status(404).json({ message: 'Wishlist not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove product from wishlist', error: error.message });
  }
};

// Get wishlist data
const getWishlistData = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items.productId');
    console.log("wishlis t",wishlist);
    res.status(200).json(wishlist || { message: 'No wishlist data found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve wishlist data', error: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlistData,
};





