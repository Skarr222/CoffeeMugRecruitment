import express, { NextFunction, Request, Response } from "express";
import { getOrderQuery, getOrdersQuery } from "../queryHandler/orderQuery";
import { createOrderCommand } from "../commandHandler/ordersCommand";
import { joiOrderSchema } from "../models/Order";
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
      next(new ResourceNotFoundError("No orders found"));
    }

    res.status(200).json(orders);
  } catch (error: any) {
    next(new ServerError(error.message));
  }
});

// GET /orders/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = Joi.object({ id: Joi.string() }).validate(req.params);

    if (error) {
      next(new ValidationError(error.message));
    }

    const order = await getOrderQuery(req.params.id);

    if (!order) {
      next(new ResourceNotFoundError("Product not found"));
    }

    res.status(200).json(order);
  } catch (error: any) {
    next(new ServerError(error.message));
  }
});

// POST /orders
router.post("/", async (req, res, next) => {
  try {
    const { error } = Joi.object(joiOrderSchema).validate(req.body);
    if (error) {
      next(new ValidationError(error.message));
    }
    await createOrderCommand(req.body);
    res.status(201);
  } catch (error: any) {
    next(new ServerError(error.message));
  }
});

export default router;
