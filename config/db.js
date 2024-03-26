const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {});
  // Another option for sanitizing and preventing NoSQL injections
  // mongoose.set("sanitizeFilter", true)
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
