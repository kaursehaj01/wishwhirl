const Order = require('../models/orderModel.js')

// Order Controllers
const createOrder = async (req, res) => {
    try {
      const { items, total } = req.body;
      const userId = req.user.id;
  
      const newOrder = new Order({ user: userId, items, total });
      await newOrder.save();
  
      res.status(201).json({ msg: 'Order created successfully', order: newOrder });
    } catch (err) {
      res.status(500).json({ msg: 'Error creating order', error: err.message });
    }
  };

  module.exports = createOrder;