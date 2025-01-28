import { ErrorType } from "../models/Enums";

export class ResourceNotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorType.ResourceNotFoundError;
    this.message = message;
    this.statusCode = 404;
  }
}
