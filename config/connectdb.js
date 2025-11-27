const mongoose = require("mongoose");

const connectdb = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log(`Database connected...`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;