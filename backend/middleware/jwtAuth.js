const jwt = require('jsonwebtoken')
require('dotenv').config()

// Generate token
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  };
  
  // Verify token middleware
  const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: "You are not authenticated" });
    }
  
    const token = authHeader.split(' ')[1]; // Extract the token
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user information to request
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Unauthorized user or invalid token" });
    }
};

module.exports ={generateToken, verifyToken}