import { User, type Ticket, type TicketStatus, type UserRole } from "db";

export interface ITicketService {
  createTicket(dto: CreateTicketDto): Promise<Ticket | void>;
  editTicket(dto: EditTicketDto): Promise<Ticket | void | null>;
  deleteTicket(ticketId: string, deleterId: string): void;
  findTicketById(id: string): Promise<Ticket | void | null>;
  resolveTicket(dto: ResolveTicketDto): Promise<Ticket | void | null>;
  getTicketById(dto: GetTicketByIdDto): Promise<Ticket | void | null>;
  getTicketsByFilter(dto: GetTicketByFilterDto): Promise<Ticket[] | void | null>;
}

export interface CreateTicketDto {
  description: string;
  creator: string;
}
export interface EditTicketDto {
  description: string;
  ticketId: string;
  editorId: string;
}
export interface ResolveTicketDto {
  ticketId: string;
  status: TicketStatus;
  resolveText: string;
  userRole: UserRole;
}
export interface GetTicketByIdDto {
  ticketId: string;
  client: User;
}
export interface GetTicketByFilterDto {
  client: User;
  filter: Filter;
}

interface Filter {
  createdAt?: string | Date;
  updatedAt?: string | Date;
  _id?: string;
  creator?: string;
  status?: string;
}