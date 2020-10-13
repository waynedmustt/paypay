import joi from '@hapi/joi';

export const submitFeedbackAssigneeSchema = joi.object({
  feedback: joi.required(),
  isSubmitted: joi.boolean(),
});
