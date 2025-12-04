import callback from './callback';
import contact from './contact';
import subscribe from './subscribe';
import user from './user';
import * as Sentry from '@sentry/cloudflare';

class Router {
  routes: Record<string, (request: Request, env: Env) => Promise<Response>>;

  constructor() {
    this.routes = {};
  }

  register(
    route: string,
    handler: (request: Request, env: Env) => Promise<Response>,
  ) {
    this.routes[route] = handler;
  }

  validateGetRequest(request: Request): Response | true {
    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    if (!request.headers.get('accept')?.includes('application/json')) {
      return new Response('Unsupported Media Type', { status: 415 });
    }
    return true;
  }

  validatePostRequest(request: Request): Response | true {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return new Response('Unsupported Media Type', { status: 415 });
    }
    if (!request.body) {
      return new Response('Bad Request', { status: 400 });
    }
    return true;
  }

  async handle(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const routeHandler = this.routes[url.pathname];
    if (routeHandler) {
      try {
        if (request.method === 'GET') {
          const validation = this.validateGetRequest(request);
          if (validation !== true) {
            return validation;
          }
        } else if (request.method === 'POST') {
          const validation = this.validatePostRequest(request);
          if (validation !== true) {
            return validation;
          }
        } else {
          return new Response('Method Not Allowed', { status: 405 });
        }
        return await routeHandler(request, env);
      } catch (error) {
        Sentry.captureException(error);
        return new Response(null, { status: 500 });
      }
    }
    return new Response(null, { status: 404 });
  }
}

const router = new Router();

router.register('/api/ping', async () => {
  return Response.json({ name: 'Pong' });
});

router.register('/api/contact', async (request) => {
  return await contact.fetch(request);
});

router.register('/api/callback', async (request) => {
  return await callback.fetch(request);
});

router.register('/api/user', async (request, env) => {
  return await user.fetch(request, env);
});

router.register('/api/subscribe', async (request) => {
  return await subscribe.fetch(request);
});

export interface Env {
  portfolio_blog_prod: D1Database;
  CF_VERSION_METADATA: { id: string };
}

export default Sentry.withSentry<Env>(
  (env: Env) => {
    const { id: versionId } = env.CF_VERSION_METADATA;
    return {
      enabled: process.env.NODE_ENV === 'production',
      release: versionId,
      dsn: 'https://6b5cbe77143dd757c110483ea03fb963@o685214.ingest.us.sentry.io/4510303952502784',
      sendDefaultPii: true,
    };
  },
  {
    async fetch(request: Request, env: Env): Promise<Response> {
      return router.handle(request, env);
    },
  } satisfies ExportedHandler<Env>,
);
