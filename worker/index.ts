import contact from "./contact";
import * as Sentry from "@sentry/cloudflare";

export default Sentry.withSentry(
    () => ({
        dsn: "https://6b5cbe77143dd757c110483ea03fb963@o685214.ingest.us.sentry.io/4510303952502784",
        // Setting this option to true will send default PII data to Sentry.
        // For example, automatic IP address collection on events
        sendDefaultPii: true,
    }),
    {
        async fetch(request: Request): Promise<Response> {
            const url = new URL(request.url);

            if (url.pathname.startsWith("/api/ping")) {
                return Response.json({
                    name: "Pong",
                });
            }
            if (url.pathname.startsWith("/api/contact")) {
                return await contact.fetch(request);
            }

            return new Response(null, { status: 404 });
        },
    } satisfies ExportedHandler
);