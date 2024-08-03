import { ApiError } from "./api-error";
import { statusCodes } from "shared/utils";

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(statusCodes.conflictStatusCode, message);
  }
}
