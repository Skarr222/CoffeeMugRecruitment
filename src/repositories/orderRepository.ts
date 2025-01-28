import { Order } from "../models/Order";

export const getOrders = async () => {
  return await Order.find().populate("products.productId");
};

export const getOrder = async (id: number) => {
  return await Order.findById(id).populate("products.productId");
};

export const createOrder = async (payload: typeof Order) => {
  const order = new Order(payload);
  return await order.save();
};

export const deleteOrder = async (id: number) => {
  await Order.findOneAndDelete({ id });
};
