import express from "express";
import dotenv from "dotenv";
import { dataSourceConnection } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

dataSourceConnection()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: any) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
