import joi from '@hapi/joi';

export const updatePerformanceReviewSchema = joi.object({
  id: joi.number().optional(),
  name: joi.optional(),
  year: joi.optional(),
  isCompleted: joi.optional(),
  user: joi.optional(),
});
