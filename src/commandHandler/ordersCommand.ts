import { Order } from "../models/Order";

export const createOrderCommand = async (payload: typeof Order) => {
  const order = new Order(payload);
  await order.save();
};
