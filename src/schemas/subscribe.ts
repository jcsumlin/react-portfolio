import z from 'zod';

const subscribeSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }),
});

const subscribeResponseObject = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type SubscribeResponse = z.infer<typeof subscribeResponseObject>;
export type SubscribeFormData = z.infer<typeof subscribeSchema>;
export { subscribeSchema, subscribeResponseObject };
