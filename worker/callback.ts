import { getGitHubAccessToken } from '../functions/github_oauth';

export default {
  async fetch(
    request: Request<unknown, CfProperties<unknown>>,
  ): Promise<Response> {
    const code = new URL(request.url).searchParams.get('code');
    if (!code) {
      throw new Error('Missing code parameter');
    }
    const token = await getGitHubAccessToken(code);

    return new Response('Success!', {
      status: 301,
      headers: {
        Location: `/authorize`,
        'Set-Cookie': `access_token=${token}; Path=/; HttpOnly`,
      },
    });
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
