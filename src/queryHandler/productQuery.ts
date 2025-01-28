import { Product } from "../models/Product";
import { getProduct, getProducts } from "../repositories/productRepository";

export const getAllProductsQuery = async () => {
  const products = await getProducts();
  return products;
};

export const getProductByIdQuery = async (productId: number) => {
  const product = await getProduct(productId);
  return product;
};
