import joi from '@hapi/joi';

export const createAssigneeSchema = joi.object({
  id: joi.number().optional(),
  feedback: joi.optional(),
  isSubmitted: joi.boolean(),
  user: joi.required(),
  performanceReview: joi.required(),
});
