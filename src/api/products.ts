import express, { NextFunction, Request, Response } from "express";

import {
  createProductCommand,
  updateProductStockCommand,
} from "../commandHandler/productsCommand";
import {
  getProductQuery,
  getProductsQuery,
} from "../queryHandler/productQuery";

const router = express.Router();

//* GET /products
router.get("/", async (req, res, next) => {
  try {
    const products = await getProductsQuery();
    res.status(200).json(products);
    //TODO blagam nie uzywaj
  } catch (error) {
    next(error);
  }
});

//* GET /product/:id
//@ts-ignore
router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductQuery(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error: any) {
    next(error);
  }
});

// POST /products
router.post("/", async (req, res, next) => {
  try {
    const product = await createProductCommand(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    next(error);
  }
});

// POST /products/:id/restock
router.post("/:id/restock", async (req, res, next) => {
  try {
    const product = await updateProductStockCommand(
      req.params.id,
      req.body.stock
    );
    res.status(200).json(product);
  } catch (error: any) {
    next(error);
  }
});

// POST /products/:id/sell
router.post("/:id/sell", async (req, res, next) => {
  try {
    const product = await updateProductStockCommand(
      req.params.id,
      -req.body.stock
    );
    res.status(200).json(product);
  } catch (error: any) {
    next(error);
  }
});

export default router;
