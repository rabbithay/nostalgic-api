import Joi from 'joi';

export const newMovieBodySchema = Joi.object({
  title: Joi.string().required(),
  parentalRating: Joi.string().valid('livre', '10', '12', '14', '16', '18').required(),
  newRelease: Joi.boolean().required(),
});
