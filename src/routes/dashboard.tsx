import useGetUser from '@/hooks/useGetUser';
import { createFileRoute } from '@tanstack/react-router';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetUser();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No user data available</h1>
          <p className="text-gray-600">Please try logging in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex items-start gap-6">
          <img
            src={data.avatarUrl}
            alt={`${data.username}'s avatar`}
            className="w-24 h-24 rounded-full border-2 border-border"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{data.username}</h1>
              {!data.readOnly ? (
                <Badge variant="destructive">Site Admin</Badge>
              ) : (
                <Badge variant="secondary">Read Only</Badge>
              )}
            </div>
            <Button asChild>
              <a href={data.htmlUrl} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
