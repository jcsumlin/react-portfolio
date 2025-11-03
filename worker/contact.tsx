import {
  validatePayload,
  sendThankYouEmail,
  sendContactNotificationEmail,
} from "../functions/send_email";

export default {
  async fetch(request, _env, _context): Promise<Response> {
    const json = await request.json();
    const result = validatePayload(json);
    if (!result.success) {
      return Response.json(
        { error: "Invalid form data", details: result.error },
        { status: 400 }
      );
    }
    const data = result.data;
    if (data.organization) {
      return Response.json({ message: "Bot detected" }, { status: 200 });
    }
    try {
      await sendThankYouEmail(data);
      await sendContactNotificationEmail(data);
      return Response.json(data);
    } catch (error) {
      console.error("Error sending emails:", error);
      return Response.json({ error: "Failed to send emails" }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
