import type { ContactFormData } from '@/types';
import { useMutation } from '@tanstack/react-query';
export default function usePostContact() {
  // Placeholder for future contact form submission logic
  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      return fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
