const express = require('express');
const  createOrder = require('../controllers/orderController.js');
const {verifyToken} = require('../middleware/jwtAuth.js')


const router = express.Router();

// Order Routes
router.post('/order', verifyToken, createOrder);

module.exports = router;





