import { Model } from "mongoose";
import { type Ticket, TicketModel, TicketStatus, UserRole } from "db";

import {
  ITicketService,
  CreateTicketDto,
  EditTicketDto,
  ResolveTicketDto,
  GetTicketByIdDto,
  GetTicketByFilterDto,
} from "./types";
import {
  createBadRequestError,
  createForbiddenError,
  createNotFoundError,
  errorText,
} from "shared";

class TicketService implements ITicketService {
  constructor(private readonly model: Model<Ticket>) {}

  async findTicketById(id: string) {
    return await this.model
      .findById(id)
      .orFail(createNotFoundError(errorText.notFound.ticketNotFound));
  }

  async createTicket(dto: CreateTicketDto) {
    return await this.model.create(dto);
  }
  async editTicket({ ticketId, editorId, ...dto }: EditTicketDto) {
    //ищем тикет, если не находим, выбрасывем ошибку
    const ticket = await this.findTicketById(ticketId);
    //если тикет уже рассмотрен или запрашавающий изменение не является создателем тикета, отклоняем запрос
    if (
      ticket.status !== TicketStatus.pending ||
      editorId !== ticket.creator.toString()
    ) {
      throw createForbiddenError(errorText.forbidden);
    }

    ticket.description = dto.description;
    ticket.save();

    return ticket;
  }
  async deleteTicket(ticketId: string, deleterId: string) {
    //ищем тикет, если не находим, выбрасывем ошибку
    const ticket = await this.findTicketById(ticketId);
    //если запрашавающий удаление не является создателем тикета, отклоняем запрос
    if (
      ticket.status !== TicketStatus.pending ||
      deleterId !== ticket.creator.toString()
    ) {
      throw createForbiddenError(errorText.forbidden);
    }

    await ticket.deleteOne();
  }
  async resolveTicket({ ticketId, userRole, ...dto }: ResolveTicketDto) {
    const ticket = await this.findTicketById(ticketId);

    if (userRole !== UserRole.admin) {
      throw createForbiddenError(errorText.forbidden);
    }
    if (!(dto.status in TicketStatus)) {
      throw createBadRequestError(errorText.badRequest.validationError);
    }
    ticket.status = dto.status;
    ticket.resolveText = dto.resolveText;
    ticket.save();
    return ticket;
  }
  async getTicketById(dto: GetTicketByIdDto) {
    const ticket = await this.findTicketById(dto.ticketId);

    if (
      ticket.creator.toString() !== dto.client._id &&
      dto.client.role !== UserRole.admin
    ) {
      throw createForbiddenError(errorText.forbidden);
    }

    return ticket;
  }
  async getTicketsByFilter(dto: GetTicketByFilterDto) {
    if (dto.client.role === UserRole.admin) {
      return await this.model.find(dto.filter);
    } else {
      return await this.model.find({ creator: dto.client._id, ...dto.filter,  });
    }
  }
}
export const ticketService = new TicketService(TicketModel);
