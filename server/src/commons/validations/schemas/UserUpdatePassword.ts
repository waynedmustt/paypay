import joi from '@hapi/joi';

export const updateUserPasswordSchema = joi.object({
  id: joi.number().optional(),
  username: joi.required(),
  password: joi.required(),
  currentPassword: joi.required(),
});
