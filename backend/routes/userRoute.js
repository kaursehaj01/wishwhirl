const express = require('express');
const { userSignUp, userSignIn, userLogout} = require('../controllers/userController.js');
const {verifyToken} = require("../middleware/jwtAuth.js")

const router = express.Router();

// User Routes
router.post('/signup', userSignUp);
router.post('/login', userSignIn);
router.post('/logout', verifyToken, userLogout);

module.exports = router