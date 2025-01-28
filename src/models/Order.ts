import mongoose from "mongoose";
import { Products, productsSchema } from "./Product";
import Joi from "joi";

export interface Orders {
  customerId: string;
  products: Products[];
}
export const joiOrderSchema = Joi.object({
  customerId: Joi.number().required(),
  products: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      quantity: Joi.number().required().min(1),
    })
  ),
});

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true, maxLength: 50 },
  products: [productsSchema],
});

export const Order = mongoose.model("Order", orderSchema);
