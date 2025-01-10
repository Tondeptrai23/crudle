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
import { useLocation, useNavigate } from 'react-router-dom';

import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '../common/ui/LoadingButton';
import { getDefaultPath } from '../nav/config';

const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required!' }),
  // .email({
  //   message: "Invalid email address!"
  // }),
  password: z.string().min(1, { message: 'Password is required!' }),
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

  const [showPassword, setShowPassword] = useState(false);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
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
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password...'
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              isLoading={isLoading}
              type='submit'
              className='w-full'
            >
              Login
            </LoadingButton>
          </form>
        </Form>
        {/* <Link to='/' className='mt-4 block text-center text-sm underline'>
          Forgot your password?
        </Link> */}
      </CardContent>
    </Card>
  );
}
