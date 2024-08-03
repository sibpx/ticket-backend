import { ApiError } from "./api-error";
import { statusCodes } from "shared/utils";

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(statusCodes.notFoundStatusCode, message);
  }
}
