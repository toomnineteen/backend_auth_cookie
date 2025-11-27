const jwt = require("jsonwebtoken");
const UsersModels = require("../models/users");

// Protect routes - ตรวจสอบว่า user login หรือไม่
exports.protect = async (req, res, next) => {
  try {
    let token;

    // ดึง token จาก cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ตรวจสอบว่ามี token หรือไม่
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "กรุณาเข้าสู่ระบบเพื่อเข้าถึงข้อมูลนี้",
      });
    }

    try {
      // ตรวจสอบ token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ดึงข้อมูล user จาก database
      req.user = await UsersModels.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "ไม่พบผู้ใช้งานนี้ในระบบ",
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token ไม่ถูกต้องหรือหมดอายุ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์",
    });
  }
};

// Authorize roles - ตรวจสอบว่า user มีสิทธิ์เข้าถึงหรือไม่
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `บทบาท ${req.user.role} ไม่มีสิทธิ์เข้าถึงข้อมูลนี้`,
      });
    }
    next();
  };
};