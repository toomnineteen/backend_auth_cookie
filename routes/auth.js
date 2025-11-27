const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  register,
  login,
  logout,
  getMe,
  homeApi,
} = require("../controllers/authController");

// Home Api
router.post("/home", homeApi);

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", logout);
router.post("/me", verifyToken, getMe);

module.exports = router;
