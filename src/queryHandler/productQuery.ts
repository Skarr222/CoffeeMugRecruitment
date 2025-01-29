import { Product } from "../models/Product";

export const getProductsQuery = async () => {
  const products = await Product.find();
  return products;
};

export const getProductQuery = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};
