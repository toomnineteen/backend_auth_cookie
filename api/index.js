require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("../config/database");

const app = express();

// Backend: api/index.js
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://front-end-auth-use-cookie.vercel.app",
  ],
  credentials: true, // ✅ สำคัญมาก!
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ เพิ่ม methods
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ เพิ่ม headers
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Connect to database
connectDB();

// Import routes
const authRoutes = require("../routes/auth");

// Mount routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API is running",
    endpoints: {
      home: "GET /api/auth/home",
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      logout: "POST /api/auth/logout",
      me: "GET /api/auth/me",
      health: "GET /api/health",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "เกิดข้อผิดพลาดของ Server",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Start server (for local development)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
