const express = require("express");
const router = express.Router();

const { login, register, read, currentUser, logout } = require("../controllers/auth.js");
const { authenticateToken } = require("../middlewares/authenticateToken.js");

// USERS
router.post("/api/login", login);
router.post("/api/register", register);
router.get("/api/read", authenticateToken, read);
router.get("/api/me", authenticateToken, currentUser);
router.get("/api/logout", logout);

module.exports = router;