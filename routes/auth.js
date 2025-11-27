const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  register,
  login,
  logout,
  getMe,
  homeApi
} = require("../controllers/authController");

// Home Api
router.post("/home", homeApi);

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;