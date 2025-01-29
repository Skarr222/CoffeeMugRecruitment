import express, { NextFunction, Request, Response } from "express";
import { getOrderQuery, getOrdersQuery } from "../queryHandler/orderQuery";
import { createOrderCommand } from "../commandHandler/ordersCommand";
import { ValidationError } from "../errorTypes/ValidationError";
import { ResourceNotFoundError } from "../errorTypes/ResourceNotFoundError";
import { ServerError } from "../errorTypes/ServerError";
import Joi from "joi";

const router = express.Router();

// GET /orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getOrdersQuery();
    if (orders.length === 0) {
      throw new ResourceNotFoundError("No orders found");
    }

    res.status(200).json(orders);
  } catch (error: any) {
    next(error);
  }
});

// GET /orders/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = Joi.object({
      id: Joi.string().max(50).required(),
    }).validate(req.params);

    if (error) {
      throw new ValidationError(error.message);
    }

    const order = await getOrderQuery(req.params.id);

    if (!order) {
      throw new ResourceNotFoundError("Order not found");
    }

    res.status(200).json(order);
  } catch (error: any) {
    next(error);
  }
});

// POST /orders
router.post("/", async (req, res, next) => {
  try {
    const { error } = Joi.object({
      customerId: Joi.string().max(50).required(),
      products: Joi.array().items({
        id: Joi.string().required().max(50),
        qty: Joi.number().positive().integer().strict().max(50),
      }),
    }).validate(req.body);

    if (error) {
      throw new ValidationError(error.message);
    }

    await createOrderCommand(req.body);
    res.status(201).send();
  } catch (error: any) {
    next(error);
  }
});

export default router;
