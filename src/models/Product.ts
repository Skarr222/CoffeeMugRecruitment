import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  id: { type: Number, require: true, unique: true, maxLength: 50 },
  name: { type: String, require: true, maxLength: 50 },
  descritpion: { type: String, require: true, min: 0, maxLength: 50 },
  price: { type: Number, require: true, min: 0, maxLength: 50 },
  stock: { type: Number, require: true, min: 0, maxLength: 50 },
});

export const Product = mongoose.model("Product", productsSchema);
