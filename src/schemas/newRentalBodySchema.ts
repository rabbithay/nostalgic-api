import Joi from 'joi';

export const newRentalBodySchema = Joi.object({
  title: Joi.string().required(),
  parentalRating: Joi.string().valid('livre', '10', '12', '14', '16', '18').required(),
  newRelease: Joi.boolean().required(),
});
