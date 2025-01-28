import mongoose from "mongoose";
import { Products, productsSchema } from "./Product";
import Joi from "joi";

export interface Orders {
  customerId: string;
  products: Products[];
}

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true, maxLength: 50 },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export const Order = mongoose.model("Order", orderSchema);
