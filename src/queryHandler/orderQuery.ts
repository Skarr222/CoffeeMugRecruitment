import { getOrder, getOrders } from "../repositories/orderRepository";

export const getOrdersQuery = async () => {
  const orders = await getOrders();
  return orders;
};

export const getOrderQuery = async (id: string) => {
  const order = await getOrder(id);
  return order;
};
