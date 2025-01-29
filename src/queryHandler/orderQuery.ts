import { Order } from "../models/Order";

export const getOrdersQuery = async () => {
  const orders = await Order.find().populate("products");
  return orders;
};

export const getOrderQuery = async (id: string) => {
  const order = await Order.findById(id).populate("products");
  return order;
};
