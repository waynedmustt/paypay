import joi from '@hapi/joi';

export const updateUserSchema = joi.object({
  id: joi.number().optional(),
  firstName: joi.optional(),
  lastName: joi.optional(),
  username: joi.optional(),
  password: joi.forbidden(),
  isActive: joi.optional(),
  role: joi.optional(),
});
