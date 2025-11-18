import { getGitHubUserData } from '../functions/github_oauth';
import { parse } from 'cookie';
import { drizzle } from 'drizzle-orm/d1';

export default {
  async fetch(
    request: Request<unknown, CfProperties<unknown>>,
    env: Env,
  ): Promise<Response> {
    const db = drizzle(env.portfolio_blog_prod);

    if (request.method !== 'GET') {
      return new Response(null, { status: 405 });
    }
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return new Response(null, { status: 415 });
    }
    const cookies = parse(request.headers.get('cookie') || '');
    if (!request.headers.get('cookie') || !cookies['access_token']) {
      return new Response(null, { status: 401 });
    }
    const response = await getGitHubUserData(cookies['access_token']);
    try {
    } catch (error) {
      return new Response(null, { status: 500 });
    }
    const data = {
      readOnly: true,
      avatarUrl: response.avatar_url,
      username: response.login,
      htmlUrl: response.html_url,
    };
    if (response.login === 'jcsumlin') {
      data.readOnly = false;
    }
    return Response.json(data);
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
