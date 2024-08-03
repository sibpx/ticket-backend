import express from "express";
import { errors } from "celebrate";
import { createNotFoundError, errorText } from "shared";

import { userRouter } from "./user";
import { ticketRouter } from "./ticket";

export const appRouter = express.Router();

appRouter.use(userRouter);
appRouter.use(ticketRouter);
appRouter.use(errors());
appRouter.use(() => {
  throw createNotFoundError(errorText.notFound.routeNotFound);
});
