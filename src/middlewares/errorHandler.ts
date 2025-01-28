import { NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  //@ts-ignore
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
