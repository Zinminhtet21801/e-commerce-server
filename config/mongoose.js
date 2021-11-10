const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    process.env.MONGODB_URI
);
  
  const UserSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    gmail: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    postal: {
      required: true,
      type: String,
      default: ''
    },
    address: {
      required: true,
      type: String,
    },
  });

module.exports = mongoose.model("user", UserSchema);
