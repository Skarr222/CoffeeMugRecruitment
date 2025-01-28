import express from "express";
import dotenv from "dotenv";
import { dataSourceConnection } from "./config/database";
import productRoutes from "./api/products";
import orderRoutes from "./api/orders";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//@ts-ignore
app.use(errorHandler);

dataSourceConnection()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: any) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
