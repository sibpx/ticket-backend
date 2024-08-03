import { ApiError } from "./api-error";
import { statusCodes } from "shared/utils";

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(statusCodes.unauthorizedStatusCode, message);
  }
}
