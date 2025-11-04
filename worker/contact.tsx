import { captureException } from "@sentry/cloudflare";
import {
  validatePayload,
  sendThankYouEmail,
  sendContactNotificationEmail,
} from "../functions/send_email";
import { getSentryContext } from "./helpers";

export default {
  async fetch(
    request: Request<unknown, CfProperties<unknown>>,
  ): Promise<Response> {
    if (request.method !== "POST") {
      return new Response(null, { status: 405 });
    }
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return new Response(null, { status: 415 });
    }
    if (!request.body) {
      return new Response(null, { status: 400 });
    }
    let result;
    try {
      const json = await request.json();
      result = validatePayload(json);
    } catch {
      captureException(
        new Error("Failed to parse JSON"),
        getSentryContext(request),
      );
      return new Response(null, { status: 400 });
    }

    if (!result.success) {
      captureException(result.error, getSentryContext(request));
      return Response.json(
        { error: "Invalid form data", details: result.error },
        { status: 400 },
      );
    }
    const data = result.data;
    if (data.organization) {
      captureException(new Error("Bot detected"), getSentryContext(request));
      return Response.json({ message: "Bot detected" }, { status: 200 });
    }
    try {
      await sendThankYouEmail(data);
      await sendContactNotificationEmail(data);
      return Response.json(data);
    } catch (error) {
      captureException(error, getSentryContext(request));
      return Response.json({ error: "Failed to send emails" }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
