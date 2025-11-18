import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Button,
} from '@/components/ui';
import { usePostNewsletter } from '@/hooks/usePostNewsletter';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

export const Route = createFileRoute('/blog')({
  component: RouteComponent,
});

const signupInputs = z.object({
  email: z.email({ message: 'Please enter a valid email' }),
});

type FormInputs = z.infer<typeof signupInputs>;

function RouteComponent() {
  const { mutateAsync, status } = usePostNewsletter();
  const methods = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(signupInputs),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutateAsync(data.email).then(() => {
      methods.reset();
    });
  };

  return (
    <div>
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold">Coming Soon!</h1>
        <h2 className="text-lg">Enter your email to receive updates</h2>
        <p className="italic">I promise not to spam you</p>
      </div>
      <FormProvider {...methods}>
        <form
          className="flex-col place-content-center"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormField
            name={'email'}
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="dark:placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="place-self-end cursor-pointer w-full mt-4"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
