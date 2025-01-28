import express from "express";
import { getOrderQuery, getOrdersQuery } from "../queryHandler/orderQuery";
import { createOrderCommand } from "../commandHandler/ordersCommand";

const router = express.Router();
interface GetOrderRequest {
  params: { id: string };
}
// GET /orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getOrdersQuery();
    res.status(200).json(orders);
  } catch (error: any) {
    next(error);
  }
});

// GET /orders/:id
router.get("/:id", async (req: GetOrderRequest, res: any, next) => {
  try {
    const order = await getOrderQuery(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error: any) {
    next(error);
  }
});

// POST /orders
router.post("/", async (req, res, next) => {
  try {
    const order = await createOrderCommand(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    next(error);
  }
});

export default router;
