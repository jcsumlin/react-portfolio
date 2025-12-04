import { getGitHubUserData } from '../functions/github_oauth';
import { parse } from 'cookie';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '../src/db/schema';
import type { Env } from '../worker/index';

export default {
  async fetch(
    request: Request<unknown, CfProperties<unknown>>,
    env: Env,
  ): Promise<Response> {
    const db = drizzle(env.portfolio_blog_prod);

    const cookies = parse(request.headers.get('cookie') || '');
    if (!request.headers.get('cookie') || !cookies['access_token']) {
      return new Response(null, { status: 401 });
    }
    const response = await getGitHubUserData(cookies['access_token']);
    await db
      .insert(users)
      .values({
        name: response.name || 'Unknown',
        userId: response.id,
        email: response.email || 'Unknown Email',
      })
      .onConflictDoUpdate({
        target: [users.userId],
        set: {
          name: response.name || 'Unknown',
          email: response.email || 'Unknown Email',
        },
      });

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
