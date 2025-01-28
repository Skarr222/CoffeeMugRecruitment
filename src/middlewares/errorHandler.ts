import { NextFunction, Response, Request, ErrorRequestHandler } from "express";
import { logger } from "../utils/logger";

export enum ErrorType {
  ValidationError = "ValidationError",
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === ErrorType.ValidationError) {
    res.status(400).send({ error: err.message });
  }
  logger.error(err.message);

  res.status(500).send({ error: "Internal server error" });
};
