import { MiddlewareFunctionWithAuthData } from "shared";

export interface IUserHttpController {
  createUser: MiddlewareFunctionWithAuthData;
  authorizeUser: MiddlewareFunctionWithAuthData;
  getUserById: MiddlewareFunctionWithAuthData;
}
