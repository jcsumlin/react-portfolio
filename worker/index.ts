import callback from './callback';
import contact from './contact';
import subscribe from './subscribe';
import user from './user';
import * as Sentry from '@sentry/cloudflare';

export interface Env {
  portfolio_blog_prod: D1Database;
}

export default Sentry.withSentry<Env>(
  () => ({
    dsn: 'https://6b5cbe77143dd757c110483ea03fb963@o685214.ingest.us.sentry.io/4510303952502784',
    sendDefaultPii: true,
  }),
  {
    async fetch(request: Request, env: Env): Promise<Response> {
      const url = new URL(request.url);

      if (url.pathname.startsWith('/api/ping')) {
        return Response.json({
          name: 'Pong',
        });
      }
      if (url.pathname.startsWith('/api/contact')) {
        return await contact.fetch(request);
      }

      if (url.pathname.startsWith('/api/callback')) {
        return await callback.fetch(request);
      }

      if (url.pathname.startsWith('/api/user')) {
        return await user.fetch(request, env);
      }
      if (url.pathname.startsWith('/api/subscribe')) {
        return await subscribe.fetch(request);
      }

      return new Response(null, { status: 404 });
    },
  } satisfies ExportedHandler<Env>,
);
