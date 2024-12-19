import mongoose from "mongoose";
import logger from "./logger";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // Connect to MongoDB
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

mongoose.connection.on("connected", () => {
  logger.info("MongoDB connected");
});

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

export default connectDB;
