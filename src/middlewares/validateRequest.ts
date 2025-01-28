import { Request, Response } from "express";
import Joi from "joi";
import { logger } from "./logger";

const productSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(200).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

export const validateProduct = (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(300).json({ message: error.details[0].message });
  }
};
