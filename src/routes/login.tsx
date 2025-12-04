import { Button } from '@/components/ui';
import { createFileRoute } from '@tanstack/react-router';
import Github from '@/assets/github.svg?react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const getGithubIdentity = async () => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const urlParams = new URLSearchParams();
    urlParams.set('client_id', import.meta.env.VITE_GITHUB_CLIENT_ID);
    urlParams.set(
      'redirect_uri',
      import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URI,
    );
    urlParams.set('scope', 'read:user user:email');
    window.location.href = `${baseUrl}?${urlParams.toString()}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Button
          size="lg"
          className="cursor-pointer"
          onClick={getGithubIdentity}
        >
          <>
            <Github className="fill-white dark:fill-black" />
            Login with GitHub
          </>
        </Button>
      </div>
    </div>
  );
}
