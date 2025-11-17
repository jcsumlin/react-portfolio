import { useQuery } from '@tanstack/react-query';

export default function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async () => {
      const response = await fetch('/api/user', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        return console.error('Failed to fetch user data:', response.statusText);
      }
      return response.json();
    },
  });
}
