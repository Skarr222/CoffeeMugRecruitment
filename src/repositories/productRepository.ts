import { Product } from "../models/Product";

export const getProducts = async () => await Product.find();

export const getProduct = async (id: string) => await Product.findById(id);

export const createProduct = async (payload: typeof Product) => {
  const product = new Product(payload);
  return await product.save();
};

export const updateProductStock = async (id: string, stock: number) => {
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

export const deleteProduct = async (id: string) => {
  await Product.findOneAndDelete({ id });
};
