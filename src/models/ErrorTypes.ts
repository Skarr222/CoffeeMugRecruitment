export enum ErrorType {
  ValidationError = "ValidationError",
  ResourceNotFoundError = "ResourceNotFoundError",
  ServerError = "ServerError",
}

export class ResourceNotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorType.ResourceNotFoundError;
    this.message = message;
    this.statusCode = 404;
  }
}

export class ServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorType.ServerError;
    this.message = message;
    this.statusCode = 500;
  }
}

export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = ErrorType.ValidationError;
    this.message = message;
    this.statusCode = 400;
  }
}
