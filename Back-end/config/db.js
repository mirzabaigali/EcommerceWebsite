const mongoose = require("mongoose");

const connectDb = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "ecommerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected successfully to MongoDB ");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDb;
