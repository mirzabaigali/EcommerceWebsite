const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    console.log("Server is running on http://localhost:8000");
    console.log("Connected successfully to MongoDB");
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;
    console.log("Fields:", { name, email, password });

    // Check if any required field is missing
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Check if JWT_SECRET_KEY is available
    if (!process.env.JWT_SECRET_KEY) {
      console.error(
        "JWT_SECRET_KEY is missing or undefined in the environment variables"
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userID: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5d" }
    );

    res
      .status(201)
      .json({ status: "success", message: "Registration Success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to Register" });
  }
};

exports.changePassword = async (req, res) => {
  // Implement password change logic, update user password in the database
  res.send("Password changed successfully");
};
