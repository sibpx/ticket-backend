import { celebrate, Joi } from "celebrate";

export const createTicketValidation = celebrate({
  body: Joi.object().keys({
    description: Joi.string().required().min(5),
  }),
});
export const editTicketValidation = celebrate({
  params: Joi.object().keys({
    ticketId: Joi.string().alphanum().required().hex().length(24),
  }),
});
export const deleteTicketValidation = celebrate({
  params: Joi.object().keys({
    ticketId: Joi.string().alphanum().required().hex().length(24),
  }),
});
export const resolveTicketValidation = celebrate({
  params: Joi.object().keys({
    ticketId: Joi.string().alphanum().required().hex().length(24),
  }),
  body: Joi.object().keys({
    status: Joi.string().required(),
    resolveText: Joi.string().required(),
  }),
});
export const getTicketByIdValidation = celebrate({
  params: Joi.object().keys({
    ticketId: Joi.string().alphanum().required().hex().length(24),
  }),
});
export const getTicketsByFilterValidation = celebrate({
  body: Joi.object().keys({
    filter: Joi.object(),
  }),
});
