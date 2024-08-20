import { User, UserRole } from "db";
import { ticketService, ITicketService } from "services";
import {
  type MiddlewareFunctionWithAuthData,
  compareToNaN,
  statusCodes,
} from "shared";

import { ITicketHttpController } from "./types";

class TicketHttpController implements ITicketHttpController {
  constructor(private readonly service: ITicketService) {}

  createTicket: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const ticket = await this.service.createTicket({
        ...req.body,
        creator: req.user?._id,
      });
      res.status(statusCodes.createdStatusCode).send({ ticket });
    } catch (e) {
      next(e);
    }
  };

  editTicket: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const ticket = await this.service.editTicket({
        ...req.body,
        ticketId: req.params.ticketId,
        editorId: req.user?._id.toString(),
      });
      res.status(statusCodes.okStatusCode).send({ ticket });
    } catch (e) {
      next(e);
    }
  };

  deleteTicket: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      await this.service.deleteTicket(
        req.params.ticketId,
        req.user?._id.toString() as string,
      );
      res.status(statusCodes.okStatusCode).send({ message: "OK" });
    } catch (e) {
      next(e);
    }
  };

  resolveTicket: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const ticket = await this.service.resolveTicket({
        ticketId: req.params.ticketId,
        userRole: req.user?.role as UserRole,
        ...req.body,
      });
      res.status(statusCodes.okStatusCode).send({ ticket });
    } catch (e) {
      next(e);
    }
  };

  getTicketById: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const ticket = await this.service.getTicketById({
        ticketId: req.params.ticketId,
        client: req.user as User,
      });
      res.status(statusCodes.okStatusCode).send({ ticket });
    } catch (e) {
      next(e);
    }
  };

  getTicketsByFilter: MiddlewareFunctionWithAuthData = async (
    req,
    res,
    next,
  ) => {
    try {
      const { limit, page, ...filter } = req.query;
      const docLimit = compareToNaN(limit as string, 5);
      const docPage = compareToNaN(page as string, 1);

      const tickets = await this.service.getTicketsByFilter({
        filter: filter,
        client: req.user as User,
        limit: docLimit,
        page: docPage,
      });
      res.status(statusCodes.okStatusCode).send({ tickets });
    } catch (e) {
      next(e);
    }
  };
}

export const ticketHttpController = new TicketHttpController(ticketService);
