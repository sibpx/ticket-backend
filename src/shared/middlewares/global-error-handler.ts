import { statusCodes, errorText } from "shared";
import { ErrorMiddlewareFunction } from "./types";

export const globalErrorHandler: ErrorMiddlewareFunction = (
  error,
  req,
  res,
  next
) =>
  res
    .status(error.status || statusCodes.internalStatusCode)
    .send({ message: error.status ? error.message : error.message });
