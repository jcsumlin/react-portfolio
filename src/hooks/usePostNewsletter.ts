import type { SubscribeFormData, SubscribeResponse } from '@/schemas/subscribe';
import { useMutation } from '@tanstack/react-query';

const postNewsletter = async (
  payload: SubscribeFormData,
): Promise<SubscribeResponse> => {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || 'Subscription failed');
  }
  return res.json();
};

export function usePostNewsletter() {
  return useMutation({
    mutationKey: ['newsletter', 'subscribe'],
    mutationFn: (email: string) => postNewsletter({ email }),
  });
}
