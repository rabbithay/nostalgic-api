import Joi from 'joi';

export const newCustomerBodySchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().required().length(11),
  birthdate: Joi.date().raw().required(),
});
