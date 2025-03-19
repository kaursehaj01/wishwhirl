const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile:{
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;