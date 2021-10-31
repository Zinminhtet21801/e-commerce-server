const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://admin:admin@e-commerce.13she.mongodb.net/e-commercedb"
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

const User = mongoose.model("user", UserSchema);

module.exports = User; 