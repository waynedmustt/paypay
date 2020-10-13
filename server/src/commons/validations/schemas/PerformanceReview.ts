import joi from '@hapi/joi';

export const createPerformanceReviewSchema = joi.object({
  id: joi.number().optional(),
  name: joi.required(),
  year: joi.required(),
  isCompleted: joi.boolean(),
  user: joi.required(),
});
