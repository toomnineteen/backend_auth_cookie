const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

exports.register = async (req, res) => {
  try {
    const { display_name, email, password } = req.body;

    if (!display_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      display_name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ต้องใช้ HTTPS บน Vercel
      sameSite: "None", // สำคัญสำหรับ cross-site
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 วัน (ใส่ซะ)
    });

    res.status(200).json({ message: "Logged in" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    return res.status(200).json({ message: "ออกจากระบบเรียบร้อย" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

exports.read = async (req, res) => {
  try {
    const users = await Users.find().select("display_name email").lean();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

exports.currentUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await Users.findById(id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
