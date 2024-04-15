const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Remove the 'username' field
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
