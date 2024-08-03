import { SchemaDefinitionProperty } from "mongoose";

export type Ticket = {
  id: string;
  description: string;
  status: TicketStatus;
  creator: SchemaDefinitionProperty;
  created_at: Date;
  updated_at: Date;
  resolveText: string;
};
export enum TicketStatus {
  pending = "pending",
  resolved = "resolved",
  rejected = "rejected",
}
