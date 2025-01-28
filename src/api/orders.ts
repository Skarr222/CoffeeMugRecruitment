import express from "express";
import { getOrderQuery, getOrdersQuery } from "../queryHandler/orderQuery";
import { createOrderCommand } from "../commandHandler/ordersCommand";
import { logger } from "../middlewares/logger";
import { validateOrder } from "../middlewares/validateRequest";

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
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
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
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
});

// POST /orders
router.post("/", async (req, res, next) => {
  try {
    const validationResult = validateOrder(req, res);
    if (validationResult?.statusCode === 300) {
      next(validationResult);
      return;
    }
    const order = await createOrderCommand(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
});

export default router;
