import { NextFunction, Response, Request } from "express";
import { logger } from "../utils/logger";
import { ErrorType } from "../models/Enums";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === ErrorType.ValidationError) {
    res.status(400).send({ error: err.message, status: 400 });
  }
  if (err.name === ErrorType.ResourceNotFoundError) {
    res.status(404).send({ error: err.message, status: 404 });
  }
  if (err.name === ErrorType.ServerError) {
    res.status(500).send({ error: err.message, status: 500 });
  }
  logger.error(err.message);
};
