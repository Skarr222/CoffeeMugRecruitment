import mongoose from "mongoose";

export const dataSourceConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Failed to connect to the database", err);
    throw err;
  }
};
