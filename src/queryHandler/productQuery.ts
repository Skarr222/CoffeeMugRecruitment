import { Product } from "../models/Product";

export const getProductsQuery = async () => {
  const products = await Product.find();
  return products;
};

export const getProductQuery = async (id: string) => {
  const product = await Product.findById(id);
  return product;
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
