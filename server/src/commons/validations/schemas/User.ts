import joi from '@hapi/joi';

export const createUserSchema = joi.object({
  id: joi.number().optional(),
  firstName: joi.required(),
  lastName: joi.required(),
  username: joi.string(),
  password: joi.string(),
  isActive: joi.boolean(),
  role: joi.required(),
});
