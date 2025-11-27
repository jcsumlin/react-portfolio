import { subscribeSchema } from '../src/schemas/subscribe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default {
  async fetch(
    request: Request<unknown, CfProperties<unknown>>,
  ): Promise<Response> {
    const json = await request.json();
    const result = subscribeSchema.safeParse(json);
    if (!result.success) {
      throw new Error('Invalid subscription data');
    }
    const email = result.data.email;
    console.log(`New subscription from email: ${email}`);
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: 'e021f1d1-235e-4116-948d-86779f79eee2',
    });

    if (error) {
      throw new Error('Failed to subscribe');
    }
    console.log(`Successfully added ${email} to the mailing list.`);
    return Response.json(
      { success: true, message: 'Subscribed successfully!' },
      { status: 200 },
    );
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
