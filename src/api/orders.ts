import express from "express";
import { getOrderQuery, getOrdersQuery } from "../queryHandler/orderQuery";
import { createOrderCommand } from "../commandHandler/ordersCommand";
import { logger } from "../middlewares/logger";

const router = express.Router();
interface GetOrderRequest {
  params: { id: number };
}
// GET /orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getOrdersQuery();
    res.status(200).json(orders);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    throw new Error(error.message);
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
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    throw new Error(error.message);
  }
});

// POST /orders
router.post("/", async (req, res, next) => {
  try {
    const order = await createOrderCommand(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    throw new Error(error.message);
  }
});

export default router;
