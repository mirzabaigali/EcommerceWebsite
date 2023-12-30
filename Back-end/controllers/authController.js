const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  // Implement login logic, validate user credentials, and generate JWT
  // Return JWT to the client upon successful login
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.find({ email: email });
    if (user) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      if (name && email && password) {
        const doc = new User({
          name: name,
          email: email,
          password: password,
        });
        await doc.save();
      } else {
        res.status(400).json({ message: "All fields are required" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  // try {
  //   const { username, email, password } = req.body;

  //   // Validate email format
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     return res.status(400).json({ message: "Invalid email format" });
  //   }

  //   // Check if email already exists
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ message: "Email already exists" });
  //   }

  //   // Validate password strength
  //   // This example requires at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //     return res.status(400).json({
  //       message:
  //         "Weak password. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.",
  //     });
  //   }

  //   // Hash the password
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Create a new user
  //   const newUser = new User({
  //     username,
  //     email,
  //     password: hashedPassword,
  //   });

  //   // Save the user to the database
  //   await newUser.save();

  //   // Generate JWT
  //   const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
  //     expiresIn: "1h",
  //   });

  //   res.status(201).json({ token });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
};

exports.changePassword = async (req, res) => {
  // Implement password change logic, update user password in the database
  res.send("Password changed successfully");
};
