import { type GitHubUser } from '../src/schemas/githubUser';

const clientId = process.env.VITE_GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = process.env.VITE_GITHUB_OAUTH_REDIRECT_URI;

interface GitHubOAuthResponse {
  access_token: string;
  token_type: string;
  scope: string;
  error?: string;
  error_description?: string;
}

export function getGitHubAccessToken(code: string): Promise<string> {
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code,
    }),
  })
    .then((response) => response.json() as Promise<GitHubOAuthResponse>)
    .then((data: GitHubOAuthResponse) => {
      console.log('GitHub OAuth response data:', data);
      if (data.error) {
        throw new Error(
          data.error_description || 'Failed to obtain access token',
        );
      }
      return data.access_token;
    });
}

export function getGitHubUserData(accessToken: string): Promise<GitHubUser> {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': 'Portfolio Admin',
  };
  return fetch('https://api.github.com/user', {
    method: 'GET',
    headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch user data from GitHub');
    }
    return response.json() as Promise<GitHubUser>;
  });
}
