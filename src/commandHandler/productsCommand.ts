import { Product, Products } from "../models/Product";
import {
  createProduct,
  updateProductStock,
} from "../repositories/productRepository";

export const createProductCommand = async (payload: Products) => {
  await createProduct(payload);
};

export const updateProductStockCommand = async (id: string, stock: number) => {
  await updateProductStock(id, stock);
};
