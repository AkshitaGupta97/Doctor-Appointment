import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB connection error:", err.message);
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4 // helps fix DNS issues on Windows
    });

  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
  }
};

export default connectDB;
