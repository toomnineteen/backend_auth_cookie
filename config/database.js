const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> ใช้การเชื่อมต่อ database ที่มีอยู่');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB เชื่อมต่อสำเร็จ');
  } catch (error) {
    console.error('❌ MongoDB เชื่อมต่อล้มเหลว:', error.message);
    throw error;
  }
};

module.exports = connectDB;