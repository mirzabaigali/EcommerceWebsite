const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
