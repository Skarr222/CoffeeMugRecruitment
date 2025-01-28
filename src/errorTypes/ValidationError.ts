import { ErrorType } from "../models/Enums";

export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorType.ValidationError;
    this.message = message;
    this.statusCode = 400;
  }
}
