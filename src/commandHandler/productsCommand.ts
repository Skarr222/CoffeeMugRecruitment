import { Product, Products } from "../models/Product";

export const updateProductStockCommand = async (id: string, stock: number) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }
  if (!product.stock) {
    throw new Error("Product stock is not defined");
  }

  product.stock += stock;

  if (product.stock < 0) {
    throw new Error("Stock cannot be negative");
  }

  return await product.save();
};

export const createProductCommand = async (payload: Products) => {
  const product = new Product(payload);
  return await product.save();
};

export const deleteProductCommand = async (id: string) => {
  await Product.findOneAndDelete({ id });
};
