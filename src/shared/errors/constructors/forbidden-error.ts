import { ApiError } from "./api-error";
import { statusCodes } from "shared/utils";

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(statusCodes.forbiddenStatusCode, message);
  }
}
