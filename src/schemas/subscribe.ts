import z from 'zod';

const subscribeSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }),
});

export type SubscribeResponse = {
  success: boolean;
  message: string;
};
export type SubscribeFormData = z.infer<typeof subscribeSchema>;
export { subscribeSchema };
