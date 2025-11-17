import { captureException } from '@sentry/cloudflare';
import getSentryContext from '../functions/get_sentry_context';
import { subscribeSchema } from '../src/schemas/subscribe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default {
  async fetch(
    request: Request<unknown, CfProperties<unknown>>,
  ): Promise<Response> {
    // Initial request validations
    if (request.method !== 'POST') {
      return new Response(null, { status: 405 });
    }

    if (!request.headers.get('content-type')?.includes('application/json')) {
      return new Response(null, { status: 415 });
    }
    if (!request.body) {
      return new Response(null, { status: 400 });
    }

    let result;
    try {
      const json = await request.json();
      result = subscribeSchema.safeParse(json);
    } catch {
      captureException(
        new Error('Failed to parse JSON'),
        getSentryContext(request),
      );
      return new Response(null, { status: 400 });
    }
    if (!result.success) {
      captureException(result.error, getSentryContext(request));
      return Response.json(
        { error: 'Invalid form data', details: result.error },
        { status: 400 },
      );
    }
    const email = result.data.email;

    // Here you would add logic to store the email in your database or mailing list
    console.log(`New subscription from email: ${email}`);
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: 'e021f1d1-235e-4116-948d-86779f79eee2',
    });

    if (error) {
      captureException(
        new Error(`Failed to add subscriber: ${error.message}`),
        getSentryContext(request),
      );
      return Response.json(
        {
          success: false,
          message: 'Failed to subscribe. Please try again later.',
        },
        { status: 500 },
      );
    }
    console.log(`Successfully added ${email} to the mailing list.`);
    return Response.json(
      { success: true, message: 'Subscribed successfully!' },
      { status: 200 },
    );
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
