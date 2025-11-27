const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { register, login, getMe } = require("../controllers/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/me", verifyToken, getMe);

module.exports = router;
