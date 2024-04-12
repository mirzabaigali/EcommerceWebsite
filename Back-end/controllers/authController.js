const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
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
    const token = jwt.sign(
      { userID: newUser._id, name: newUser.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      status: "success",
      message: "Registration Success",
      token,
      name: newUser.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to Register" });
  }
};

exports.login = async (req, res) => {
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
    const token = jwt.sign(
      { userID: user._id, name: user.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Set token expiration to 1 hour
      }
    );

    res.status(200).json({
      status: "success",
      message: "Login success",
      token,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to login" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Check if any required field is missing
    if (!email || !currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    // Check if the current password is correct
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return res
        .status(401)
        .json({ status: "failed", message: "Incorrect current password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashNewPassword;
    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to change password" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email is required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
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

    // Generate a reset password token
    const resetToken = jwt.sign(
      { userID: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Set token expiration to 1 hour
      }
    );

    // Encode the reset token using URL-safe encoding
    const encodedResetToken = encodeURIComponent(resetToken);

    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      // Configure your email service provider here
      // Example: SMTP transport configuration for Gmail
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Reset Password",
      text: `Click the following link to reset your password: ${process.env.FRONTEND_URL}/api/auth/reset-password/${encodedResetToken}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Provide feedback to the user
    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to request password reset" });
  }
};

exports.resetPasswordGet = async (req, res) => {
  try {
    const { token } = req.params;

    // Decode the token using URL-safe decoding
    const decodedToken = decodeURIComponent(token);

    // Check if JWT_SECRET_KEY is available
    if (!process.env.JWT_SECRET_KEY) {
      console.error(
        "JWT_SECRET_KEY is missing or undefined in the environment variables"
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }

    // Verify the reset token
    const verifiedToken = jwt.verify(decodedToken, process.env.JWT_SECRET_KEY);
    const userID = verifiedToken.userID;

    // Find the user by ID
    const user = await User.findById(userID);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    // Create the reset password form
    const resetPasswordForm = `
    <html>
  <body>
    <h1>Reset Password</h1>
    <form id="resetPasswordForm" action="http://localhost:8000/api/auth/reset-password/${token}" method="POST">
      <label for="newPassword">New Password:</label>
      <input type="password" id="newPassword" name="newPassword" required>
      <button type="submit">Reset Password</button>
    </form>
    <p>If you did not request a password reset, please ignore this email.</p>

    <script>
  document.getElementById("resetPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Extract the new password from the form input field
    const newPassword = document.getElementById("newPassword").value;

    // Make an AJAX POST request to the API endpoint
    fetch(this.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newPassword }) // Include the newPassword field in the request body
    })
    .then(response => {
      console.log("Raw response:", response.clone().text()); // Log the raw response text
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      console.log("Data:", data); // Log the parsed data
      // Handle the response from the server
      if (data.status === "success") {
        alert(data.message); // Display a success message
      } else {
        throw new Error(data.message); // Throw an error for unsuccessful response
      }
    })
    .catch(error => {
      console.error("Error:", error); // Log any errors
      // Display an error message
      alert(error.message || "An error occurred. Please try again.");
    });
  });
</script>


  </body>
</html>

  
    `;

    // Send the reset password form as the response
    res.send(resetPasswordForm);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to reset password" });
  }
};

exports.resetPasswordPost = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Check if the new password is provided
    if (!newPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "New password is required" });
    }

    // Decode the token using URL-safe decoding
    const decodedToken = decodeURIComponent(token);

    // Check if JWT_SECRET_KEY is available
    if (!process.env.JWT_SECRET_KEY) {
      console.error(
        "JWT_SECRET_KEY is missing or undefined in the environment variables"
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }

    // Verify the reset token
    const verifiedToken = jwt.verify(decodedToken, process.env.JWT_SECRET_KEY);
    const userID = verifiedToken.userID;

    // Find the user by ID
    const user = await User.findById(userID);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashNewPassword;
    await user.save();

    // Redirect the user to the login page or display a success message
    res.send(
      "Password reset successful. You can now login with your new password."
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to reset password" });
  }
};
