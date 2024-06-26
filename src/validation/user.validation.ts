import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  age: Joi.number().required,
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
