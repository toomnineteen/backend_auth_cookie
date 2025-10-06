const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    display_name: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
