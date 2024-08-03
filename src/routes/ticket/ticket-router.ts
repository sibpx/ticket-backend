import express from "express";

import { ticketHttpController } from "controllers";

import {
  createTicketValidation,
  deleteTicketValidation,
  editTicketValidation,
  getTicketByIdValidation,
  getTicketsByFilterValidation,
  resolveTicketValidation,
} from "./ticket-router-validation";
import { adminMiddleware } from "shared";

export const ticketRouter = express.Router();

ticketRouter.post(
  "/ticket",
  createTicketValidation,
  ticketHttpController.createTicket
);
ticketRouter.patch(
  "/ticket/:ticketId",
  editTicketValidation,
  ticketHttpController.editTicket
);
ticketRouter.delete(
  "/ticket/:ticketId",
  deleteTicketValidation,
  ticketHttpController.deleteTicket
);
ticketRouter.patch(
  "/ticket/:ticketId/resolve",
  adminMiddleware,
  resolveTicketValidation,
  ticketHttpController.resolveTicket
);
ticketRouter.get(
  "/ticket/filter",
  getTicketsByFilterValidation,
  ticketHttpController.getTicketsByFilter
);
ticketRouter.get(
  "/ticket/:ticketId",
  getTicketByIdValidation,
  ticketHttpController.getTicketById
);
