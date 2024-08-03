import { userService, IUserService } from "services/user";
import { MiddlewareFunctionWithAuthData } from "shared/middlewares";
import { messageText, statusCodes } from "shared/utils";

import { IUserHttpController } from "./types";

class UserHttpController implements IUserHttpController {
  constructor(private readonly service: IUserService) {}

  createUser: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      await this.service.createUser(req.body);
      res
        .status(statusCodes.createdStatusCode)
        .send({ message: messageText.userCreated });
    } catch (e) {
      next(e);
    }
  };
  authorizeUser: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const token = await this.service.authorizeUser(req.body);
      res.status(statusCodes.okStatusCode).send({ token: token });
    } catch (e) {
      next(e);
    }
  };
  getUserById: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const user = await this.service.getUserById(req.params.userId);

      res.status(statusCodes.okStatusCode).send({ user });
    } catch (e) {
      next(e);
    }
  };
  getCurrentUser: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const user = await this.service.getUserById(req.user?._id as string);

      res.status(statusCodes.okStatusCode).send({ user });
    } catch (e) {
      next(e);
    }
  };
}

export const userHttpController = new UserHttpController(userService);
