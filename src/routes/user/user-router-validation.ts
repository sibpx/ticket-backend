import { celebrate, Joi } from "celebrate";

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30).email(),
    password: Joi.string().required().min(2).max(30),
  }),
});
export const registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30).email(),
    regCode: Joi.string(),
    password: Joi.string().required().min(2).max(30),
  }),
});
export const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required().hex().length(24),
  }),
});
