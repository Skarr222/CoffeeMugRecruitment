import { Order } from "../models/Order";

export const getOrders = async () => await Order.find();

export const getOrder = async (id: string) => await Order.findById(id);

export const createOrder = async (payload: typeof Order) => {
  const order = new Order(payload);
  return await order.save();
};

export const deleteOrder = async (id: string) => {
  await Order.findOneAndDelete({ id });
};
