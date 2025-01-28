import mongoose, { Schema, Document } from "mongoose";
import { Product } from "./Product";

interface Order extends Document {
  customerId: number;
  products: (typeof Product)[];
}

const orderSchema: Schema<Order> = new mongoose.Schema({
  customerId: { type: Number, required: true, maxLength: 50 },
  products: { type: [Product], required: true },
});

export const Order = mongoose.model<Order>("Order", orderSchema);
