import Joi, { types } from "joi";
import { Order, Orders } from "../models/Order";
import { Product } from "../models/Product";
import { updateProductStockCommand } from "./productsCommand";

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
    await updateProductStockCommand(product.id, -1);
  }
  await order.save();
};

export const deleteOrderCommand = async (id: string) => {
  await Order.findOneAndDelete({ id });
};
