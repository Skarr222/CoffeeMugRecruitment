import Joi, { types } from "joi";
import { Order, Orders } from "../models/Order";
import { Product } from "../models/Product";
import { updateProductStockCommand } from "./productsCommand";
import mongoose from "mongoose";

interface CreateOrderPayload {
  customerId: string;
  products: { id: string; qty: number }[];
}

export const createOrderCommand = async (payload: CreateOrderPayload) => {
  const order = new Order({ customerId: payload.customerId, products: [] });

  for (const product of payload.products) {
    console.log(product);
    const productFound = await Product.findById(product.id);

    if (!productFound) {
      throw new Error("Product not found");
    }
    if (!productFound.stock) {
      throw new Error("Product stock is not defined");
    }
    if (productFound.stock < product.qty) {
      throw new Error("Insufficient stock for product: " + productFound.name);
    }

    order.products.push(new mongoose.Types.ObjectId(product.id));

    try {
      await updateProductStockCommand(product.id, -product.qty);
    } catch (error) {
      throw new Error(
        "Failed to update stock for product: " + productFound.name
      );
    }
  }

  await order.save();
  return { success: true, id: order.id };
};

export const deleteOrderCommand = async (id: string) => {
  await Order.findOneAndDelete({ id: id });
  return { success: true, id };
};
