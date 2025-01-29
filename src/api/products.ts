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
import { ResourceNotFoundError, ValidationError } from "../models/ErrorTypes";

const router = express.Router();

//* GET /products
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getProductsQuery();

    if (products.length === 0) {
      throw new ResourceNotFoundError("No products found");
    }

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//* GET /product/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = Joi.object({
      id: Joi.string().required().max(50),
    }).validate(req.params);

    if (error) {
      throw new ValidationError(error.message);
    }

    // Fetch the product
    const product = await getProductQuery(req.params.id);
    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

//* POST /products
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = joiProductSchema.validate(req.body);
    if (error) {
      throw new ValidationError(error.message);
    }

    await createProductCommand(req.body);

    res.status(201).json("Product created");
  } catch (error) {
    next(error);
  }
});

//* POST /products/:id/restock
router.post(
  "/:id/restock",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodySchema = Joi.object({
        qty: Joi.number().positive().integer().strict().max(50),
      });
      const { error: bodyError } = bodySchema.validate(req.body);
      if (bodyError) {
        throw new ValidationError(bodyError.message);
      }

      const paramsSchema = Joi.object({
        id: Joi.string().required().max(50),
      });
      const { error: paramsError } = paramsSchema.validate(req.params);
      if (paramsError) {
        throw new ValidationError(paramsError.message);
      }

      const product = await updateProductStockCommand(
        req.params.id,
        req.body.stock
      );
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

//* POST /products/:id/sell
router.post(
  "/:id/sell",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodySchema = Joi.object({
        qty: Joi.number().positive().integer().strict(),
      });
      const { error: bodyError } = bodySchema.validate(req.body);
      if (bodyError) {
        throw new ValidationError(bodyError.message);
      }

      const paramsSchema = Joi.object({
        id: Joi.string().required(),
      });
      const { error: paramsError } = paramsSchema.validate(req.params);
      if (paramsError) {
        throw new ValidationError(paramsError.message);
      }
      await updateProductStockCommand(req.params.id, -req.body.qty);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
