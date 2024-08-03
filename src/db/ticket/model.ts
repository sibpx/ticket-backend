import mongoose from "mongoose";
import { Ticket, TicketStatus } from "./types";

const ticketSchema = new mongoose.Schema<Ticket>(
  {
    description: {
      type: String,
      minlength: 5,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: TicketStatus.pending,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    resolveText: {
      type: String,
    },
  },
  { versionKey: false, timestamps: { createdAt: true } }
);

export const TicketModel = mongoose.model<Ticket>("Ticket", ticketSchema);
