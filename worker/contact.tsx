import { captureException } from '@sentry/cloudflare';
import {
  sendThankYouEmail,
  sendContactNotificationEmail,
} from '../functions/send_email';
import getSentryContext from '../functions/get_sentry_context';
import verifyHCaptcha from '../functions/verify_hcaptcha';
import type { ResponseData } from '../src/types';
import { formSchema } from '../src/schemas/contactMe';

export default {
  async fetch(
    request: Request<unknown, CfProperties<unknown>>,
  ): Promise<Response> {
    const json = await request.json();
    const result = formSchema.safeParse(json);
    if (!result.success) {
      throw new Error('Invalid form data');
    }
    const data = result.data;
    const successResponse: ResponseData = {
      success: true,
      message: 'Form submitted successfully',
      data,
    };

    if (data.organization) {
      captureException(new Error('Bot detected'), getSentryContext(request));
      return Response.json(successResponse); // Silently succeed
    }
    if (
      (await verifyHCaptcha(
        request.headers.get('cf-connecting-ip') || 'unknown',
        data.hCaptchaToken,
      )) === false
    ) {
      throw new Error('hCaptcha failed');
    }
    try {
      await sendThankYouEmail(data);
      await sendContactNotificationEmail(data);
      return Response.json(successResponse);
    } catch (error) {
      throw new Error('Failed to send emails', { cause: error });
    }
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
