const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.MONGODB_URI;
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDb(DATABASE_URL)

// Routes
app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send(`Hello, World!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});