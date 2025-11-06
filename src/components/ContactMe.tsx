import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formSchema } from '@/schemas/contactMe';
import { Form } from '@/components/ui/form/useFormField';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import useTheme from '@/hooks/useTheme';
import usePostContact from '@/hooks/usePostContact';

export default function ContactMe() {
  const { theme } = useTheme();
  const { mutateAsync } = usePostContact();
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      organization: '', // Honeypot field
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutateAsync(data).then(() => {
      methods.reset();
    });
  };

  return (
    <span className="mt-4 px-4 md:px-8">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name={'name'}
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Name"
                    {...field}
                    className="placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'email'}
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Email"
                    {...field}
                    className="placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={'message'}
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add any additional comments"
                    className="resize-none placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="organization"
            control={methods.control}
            render={({ field }) => (
              <FormItem className="absolute left-[-9999px] size-px overflow-hidden">
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="hCaptchaToken"
            control={methods.control}
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormControl>
                  <HCaptcha
                    sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                    onVerify={(token: string) => onChange(token)}
                    theme={theme === 'dark' ? 'dark' : 'light'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send Message</Button>
        </form>
      </Form>
    </span>
  );
}
