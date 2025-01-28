import { Order, Orders } from "../models/Order";
import { Product } from "../models/Product";
import { updateProductStock } from "../repositories/productRepository";

interface CreateOrderPayload extends Orders {}

export const createOrderCommand = async (payload: CreateOrderPayload) => {
  const order = new Order(payload);

  for (const product of order.products) {
    const productFound = await Product.findById(product.id);
    if (!productFound) {
      throw new Error("Product not found");
    }
    if (productFound.stock === 0) {
      throw new Error("Product out of stock");
    }
    await updateProductStock(product.id, -1);
  }
  await order.save();
};
