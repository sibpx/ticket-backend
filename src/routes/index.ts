import express from "express";
import { errors } from "celebrate";
import { createNotFoundError, errorText } from "shared";

import { userRouter } from "./user";

export const appRouter = express.Router();

appRouter.use(userRouter);
appRouter.use(errors());
appRouter.use(() => {
  throw createNotFoundError(errorText.notFound.routeNotFound);
});
