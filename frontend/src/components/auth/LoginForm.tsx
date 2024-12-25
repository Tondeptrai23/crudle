import { Button } from '@/components/common/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/ui/form';
import { Input } from '@/components/common/ui/input';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getDefaultPath } from '../nav/config';

const LoginSchema = z.object({
  email: z.string(),
  // .email({
  //   message: "Invalid email address!"
  // }),
  password: z.string(),
  // .min(6, {
  //   message: "Password must be at least 6 characters!"
  // }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    login(data.email, data.password)
      .then(() => {
        setIsLoading(false);
        navigate(state?.from ? state.from : getDefaultPath());
      })
      .catch((error) => {
        setIsLoading(false);

        const axiosError = error as AxiosError;
        let description = '';

        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            description = 'Invalid email or password. Please try again.';
          }
        } else if (axiosError.request) {
          if (axiosError.code === 'ERR_NETWORK') {
            description = 'There was a network error. Please try again later.';
          }
        } else {
          // TODO: Handle other error cases
          description = axiosError.message;
        }

        toast({
          title: 'Failed to login',
          description: description,
        });
      });
  }

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-center text-2xl'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your password...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>
        <Link to='/' className='text-sm underline'>
          Forgot your password?
        </Link>
      </CardContent>
    </Card>
  );
}
