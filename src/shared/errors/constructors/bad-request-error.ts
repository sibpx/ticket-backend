import { ApiError } from "./api-error";
import { statusCodes } from "shared/utils";

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(statusCodes.badRequestStatusCode, message);
  }
}
