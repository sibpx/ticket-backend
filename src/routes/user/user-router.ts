import express from "express";
import { authMiddleware } from "shared";

import { userHttpController } from "controllers";

import {
  getUserByIdValidation,
  loginValidation,
  registerValidation,
} from "./user-router-validation";

export const userRouter = express.Router();

userRouter.post("/login", loginValidation, userHttpController.authorizeUser);
userRouter.post("/register", registerValidation, userHttpController.createUser);

userRouter.use(authMiddleware);

userRouter.get("/users/me", userHttpController.getCurrentUser);

userRouter.get(
  "/users/:userId",
  getUserByIdValidation,
  userHttpController.getUserById
);
