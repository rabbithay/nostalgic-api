import Joi from 'joi';

export const newRentalBodySchema = Joi.object({
  rentDate: Joi.date().required(),
  returnDate: Joi.date().allow(null),
  movieId: Joi.number().integer().positive(),
  customerId: Joi.number().integer().positive(),
});
