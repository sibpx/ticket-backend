import { MiddlewareFunctionWithAuthData } from "shared";

export interface ITicketHttpController {
  createTicket: MiddlewareFunctionWithAuthData;
  editTicket: MiddlewareFunctionWithAuthData;
  deleteTicket: MiddlewareFunctionWithAuthData;
  resolveTicket: MiddlewareFunctionWithAuthData;
  getTicketById: MiddlewareFunctionWithAuthData;
  getTicketsByFilter: MiddlewareFunctionWithAuthData;
}
