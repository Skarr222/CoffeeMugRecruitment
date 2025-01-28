import express from "express";
import {
  getAllProductsQuery,
  getProductByIdQuery,
} from "../queryHandler/productQuery";
import {
  createProductCommand,
  updateProductStockCommand,
} from "../commandHandler/productsCommand";
import { logger } from "../middlewares/logger";
import { validateProduct } from "../middlewares/validateRequest";

const router = express.Router();

//* GET /products
router.get("/", async (req, res) => {
  try {
    const products = await getAllProductsQuery();
    res.status(200).json(products);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    throw new Error(error.message);
  }
});

//* GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductByIdQuery(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error: any) {
    logger.error(error.message);

    res.status(500).json({ message: "Internal server error" });

    throw new Error(error.message);
  }
});

// POST /products
router.post("/", async (req, res) => {
  try {
    const validationResult = validateProduct(req, res);
    if (validationResult?.statusCode === 300) {
      return;
    }
    const product = await createProductCommand(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    logger.error(error.message);

    res.status(500).json({ message: "Internal server error" });

    throw new Error(error.message);
  }
});

// POST /products/:id/restock
router.post("/:id/restock", async (req, res) => {
  try {
    const product = await updateProductStockCommand(
      req.params.id,
      req.body.stock
    );
    res.status(200).json(product);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    throw new Error(error.message);
  }
});

// POST /products/:id/sell
router.post("/:id/sell", async (req, res) => {
  try {
    const product = await updateProductStockCommand(
      req.params.id,
      -req.body.stock
    );
    res.status(200).json(product);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ message: "Internal server error" });
    throw new Error(error.message);
  }
});

export default router;
