import useGetUser from '@/hooks/useGetUser';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/authorize')({
  component: RouteComponent,
});

function RouteComponent() {
  const { error, status } = useGetUser();
  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error loading user data: {(error as Error).message}</div>;
  }
  return <Navigate to="/dashboard" />;
}
