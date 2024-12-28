import { LoginForm } from '@/components/auth/LoginForm';
import { BookOpen } from 'lucide-react';
import React from 'react';

export const LoginPage: React.FC = () => {
  return (
    <div className='flex h-screen w-full justify-center'>
      <div className='flex w-[400px] flex-col items-center justify-center px-4'>
        <div className='mb-8 flex items-center gap-2'>
          <BookOpen className='h-8 w-8' />
          <h1 className='text-2xl font-bold'>Crudle</h1>
        </div>
        <LoginForm />
      </div>

      <div className='flex w-[400px] items-center justify-center md:w-[500px]'>
        <img
          src='/illustration.png'
          alt='Collaboration illustration'
          className='w-full'
        />
      </div>
    </div>
  );
};
