import type { ContactFormData, ResponseData } from '@/types';
import { useMutation } from '@tanstack/react-query';
export default function usePostContact() {
  // Placeholder for future contact form submission logic
  return useMutation({
    mutationFn: async (data: ContactFormData): Promise<ResponseData> => {
      return await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to submit form');
        }
        return await res.json();
      });
    },
    onSuccess: (data) => {
      console.log('Form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });
}
