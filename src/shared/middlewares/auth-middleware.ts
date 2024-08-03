import jwt from "jsonwebtoken";

import { userService } from "services";
import { createUnauthorizedError, errorText } from "shared";

import { MiddlewareFunction, TokenSchema } from "./types";

export const authMiddleware: MiddlewareFunction = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw createUnauthorizedError(errorText.notAuthorized.tokenExpired);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenSchema;
  } catch (e) {
    next(createUnauthorizedError(errorText.notAuthorized.tokenExpired));
  }
  userService
    .getUserById(payload?.id as string)
    .then((user) => {
      //@ts-ignore
      req.user = user;
      next();
    })
    .catch((e) => next(e));
};
