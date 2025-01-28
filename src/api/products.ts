import express, { NextFunction, Request, Response } from "express";

import {
  createProductCommand,
  updateProductStockCommand,
} from "../commandHandler/productsCommand";
import {
  getProductQuery,
  getProductsQuery,
} from "../queryHandler/productQuery";
import Joi from "joi";
import { joiProductSchema } from "../models/Product";
import { ValidationError } from "../errorTypes/ValidationError";
import { ServerError } from "../errorTypes/ServerError";
import { ResourceNotFoundError } from "../errorTypes/ResourceNotFoundError";

const router = express.Router();

//* GET /products
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getProductsQuery();

    if (products.length === 0) {
      next(new ResourceNotFoundError("No products found"));
    }
    res.status(200).json(products);
  } catch (error: any) {
    next(new ServerError(error.message));
  }
});

//* GET /product/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = Joi.object({
      id: Joi.string().required,
    }).validate(req.params);

    if (error) {
      next(new ValidationError(error.message));
    }

    // Fetch the product
    const product = await getProductQuery(req.params.id);
    if (!product) {
      next(new ResourceNotFoundError("Product not found"));
    }

    res.status(200).json(product);
  } catch (error: any) {
    next(new ServerError(error.message));
  }
});

// POST /products
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = Joi.object(joiProductSchema).validate(req.body);
    if (error) {
      next(new ValidationError(error.message));
    }
    await createProductCommand(req.body);

    res.status(201);
  } catch (error: any) {
    next(new ServerError(error.message));
  }
});

// POST /products/:id/restock
router.post(
  "/:id/restock",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = Joi.object({
        stock: Joi.number().required(),
        id: Joi.string().required,
      }).validate(req.body, req.params);

      if (error) {
        next(new ValidationError(error.message));
      }

      const product = await updateProductStockCommand(
        req.params.id,
        req.body.stock
      );
      res.status(200).json(product);
    } catch (error: any) {
      next(new ServerError(error.message));
    }
  }
);

// POST /products/:id/sell
router.post(
  "/:id/sell",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = Joi.object({
        stock: Joi.number().required(),
        id: Joi.string().required,
      }).validate(req.body, req.params);

      if (error) {
        next(new ValidationError(error.message));
      }

      await updateProductStockCommand(req.params.id, -req.body.stock);

      res.status(200);
    } catch (error: any) {
      next(new ServerError(error.message));
    }
  }
);

export default router;
