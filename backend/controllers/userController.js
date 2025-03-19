const Users = require('../models/userModel.js')
const bcrypt = require('bcrypt');
const {generateToken} = require('../middleware/jwtAuth.js')

// http://localhost:8090/api/signup
const userSignUp = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let userExist = await Users.findOne({ email: req.body.email });
      if (userExist) {
          return res.status(400).json({ success: false, errors: "User with this email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password generated");

  
      const newUser = new Users({ name, email, password: hashedPassword });
      await newUser.save();
      console.log("newuser",newUser);
  
      const token = generateToken({ id: newUser._id});
      console.log("token",token);

      res.status(201).json({  success: true, user: newUser, token });
    } catch (err) {
      res.status(500).json({ msg: 'Error creating user', error: err.message });
    }
  };

  // http://localhost:8090/api/login
const userSignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }
  
      const token = generateToken({ id: user._id });
      res.status(200).json({ success: true, msg:"successfully login", user, token });
    } catch (err) {
      res.status(500).json({ msg: 'Error signing in', error: err.message });
    }
  };

  //logout
// http://localhost:8070/api/logout
const userLogout = async (req, res) => {
    try {
      // Clear the token by sending an empty one with a very short expiration
      res.status(200).json({ msg: 'User logged out successfully', token: null });
    } catch (err) {
      res.status(500).json({ msg: 'Error logging out', error: err.message });
    }
  };

module.exports = {userSignUp,userSignIn, userLogout};

// const Users = require('../models/userModel.js')
// const bcrypt = require('bcrypt');
// const {generateToken} = require('../middleware/jwtAuth.js')

// // http://localhost:8090/api/signup
// const userSignUp = async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       let userExist = await Users.findOne({ email: req.body.email });
//       if (userExist) {
//           return res.status(400).json({ success: false, errors: "User with this email already exists" });
//       }
  
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       console.log("Hashed password generated");

  
//       const newUser = new Users({ name, email, password: hashedPassword });
//       await newUser.save();
//       console.log("newuser",newUser);
  
//       const token = generateToken({ id: newUser._id});
//       console.log("token",token);

//       res.status(201).json({  success: true, user: newUser, token });
//     } catch (err) {
//       res.status(500).json({ msg: 'Error creating user', error: err.message });
//     }
//   };

//   // http://localhost:8090/api/login
// const userSignIn = async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       const user = await Users.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ msg: 'User not found' });
//       }
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ msg: 'Invalid credentials' });
//       }
  
//       const token = generateToken({ id: user._id });
//       res.status(200).json({ success: true, msg:"successfully login", user, token });
//     } catch (err) {
//       res.status(500).json({ msg: 'Error signing in', error: err.message });
//     }
//   };

//   //logout
// // http://localhost:8070/api/logout
// const userLogout = async (req, res) => {
//     try {
//       // Clear the token by sending an empty one with a very short expiration
//       res.status(200).json({ msg: 'User logged out successfully', token: null });
//     } catch (err) {
//       res.status(500).json({ msg: 'Error logging out', error: err.message });
//     }
//   };

// module.exports = {userSignUp,userSignIn, userLogout};
