import Joi from "joi";
import mongoose from "mongoose";

export interface Products {
  id: string;
  name: string;
  descritpion: string;
  price: number;
  stock: number;
}

const productSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(50).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

export const productsSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true, maxLength: 50 },
  name: { type: String, require: true, maxLength: 50 },
  descritpion: { type: String, require: true, maxLength: 50 },
  price: { type: Number, require: true, maxLength: 50 },
  stock: { type: Number, require: true, maxLength: 50 },
});

export const Product = mongoose.model("Product", productsSchema);
