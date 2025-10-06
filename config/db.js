const mongoose = require("mongoose");

const db = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log(`Database connected...`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;