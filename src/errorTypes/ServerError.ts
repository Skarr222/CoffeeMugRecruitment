import { ErrorType } from "../models/Enums";

export class ServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorType.ServerError;
    this.message = message;
    this.statusCode = 500;
  }
}
