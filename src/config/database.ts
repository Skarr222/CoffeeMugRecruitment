import mongoose from "mongoose";

export const dataSourceConnection = async () => {
  const dbUri = process.env.MONGO_URI as string;
  await mongoose.connect(dbUri);
  console.log("Connected to MongoDB");
};
