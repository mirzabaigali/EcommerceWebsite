// require("dotenv").config();
// const express = require("express");
// const authController = require("../controllers/authController");
// const router = express.Router();

// router.post("/login", authController.login);
// router.post("/signup", authController.signup);
// router.post("/change-password", authController.changePassword);
// router.post("/forgot-password", authController.forgotPassword);
// router.get("/reset-password/:token", authController.resetPasswordGet);

// module.exports = router;
// authRoutes.js

const router = require("express").Router();
const {
  signup,
  login,
  changePassword,
  forgotPassword,
  resetPasswordGet,
  resetPasswordPost,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.put("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", resetPasswordGet);
router.post("/reset-password/:token", resetPasswordPost);

module.exports = router;
