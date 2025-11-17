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
      <h1 className="text-4xl font-bold text-center">Coming Soon!</h1>
      <h2 className="text-lg text-center">
        Enter your email to receive updates
      </h2>
      <FormProvider {...methods}>
        <form
          className="flex place-content-center"
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
                    className="placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="place-self-end cursor-pointer"
            disabled={status === 'pending'}
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
