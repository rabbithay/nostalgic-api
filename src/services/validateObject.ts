import Joi from 'joi';

// return false in case of invalid params
export function validateObject({
  object, schema,
}: {object: object, schema: Joi.ObjectSchema<any>}) {
  const validation = schema.validate(object);
  return !validation.error;
}
