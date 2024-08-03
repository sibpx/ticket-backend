import { ApiError } from "./api-error";
import { statusCodes } from "shared/utils";

export class InternalError extends ApiError {
  constructor(message: string) {
    super(statusCodes.internalStatusCode, message);
  }
}
