import useGetUser from '@/hooks/useGetUser';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/authorize')({
  component: RouteComponent,
  beforeLoad: async (routeContext) => {
    console.log('🚀 ~ routeContext:', routeContext);
    // You can perform any data fetching or other logic here before the component loads
    console.log('Loading /authorize route');
  },
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
