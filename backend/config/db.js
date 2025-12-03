import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);  // Stop server if database connection fails
  }
};

export default connectDB;