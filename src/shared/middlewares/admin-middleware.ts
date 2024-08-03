import { createForbiddenError, errorText } from "shared";
import { MiddlewareFunctionWithAuthData } from "./types";
import { User } from "db";

export const adminMiddleware: MiddlewareFunctionWithAuthData = (
  req,
  res,
  next
) => {
  const { role } = req.user as User;

  if (!role || role !== "ADMIN") {
    throw createForbiddenError(errorText.forbidden);
  }

  next();
};
