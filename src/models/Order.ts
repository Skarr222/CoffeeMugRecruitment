import mongoose, { Schema } from "mongoose";
import { Product, Products } from "./Product";

export interface Order {
  customerId: string;
  products: Products[];
}

const orderSchema: Schema<Order> = new mongoose.Schema({
  customerId: { type: String, required: true, maxLength: 50 },
  products: { type: [Product], required: true },
});

export const Order = mongoose.model("Order", orderSchema);
