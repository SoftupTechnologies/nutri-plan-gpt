import Zod from 'Zod';

export const fastingDataValidationSchema = Zod.object({
  height: Zod.number({
    required_error: "Height is required",
    invalid_type_error: "Height must be a number"
  }).positive(),
  weight: Zod.number({
    required_error: "Weight is required",
    invalid_type_error: "Weight must be a number"
  }).positive(),
  targetWeight: Zod.number({
    required_error: "Target weight is required",
    invalid_type_error: "Target weight must be a number"
  }).positive(),
  periodToLoseWeight: Zod.number({
    required_error: "Period to lose weight is required",
    invalid_type_error: "Period to lose weight must be a number"
  }).positive(),
  fastingType: Zod.enum(
    ['16:8', '18:6'],
    {
      required_error: "Fasting type is required",
      invalid_type_error: "Fasting type must be 16:8 or 18:6"
    }
  ),
});

export const imageDataValidationSchema = Zod.object({
  prompt: Zod.string({
    required_error: "The image prompt is required",
    invalid_type_error: "The image prompt must be a string"
  }),
})
