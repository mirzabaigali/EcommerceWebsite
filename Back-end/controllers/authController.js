const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async(req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check if any required field is missing
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ status: "failed", message: "All fields are required" });
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ status: "failed", message: "Email is already registered" });
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
        const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });

        res
            .status(201)
            .json({ status: "success", message: "Registration Success", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", message: "Unable to Register" });
    }
};
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Check if any required field is missing
        if (!email || !password) {
            return res
                .status(400)
                .json({ status: "failed", message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ status: "failed", message: "Incorrect password" });
        }

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
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h", // Set token expiration to 1 hour
        });

        res.status(200).json({ status: "success", message: "Login success", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", message: "Unable to login" });
    }
};
exports.changePassword = async(req, res) => {
    // Implement password change logic, update user password in the database
    res.send("Password changed successfully");
};