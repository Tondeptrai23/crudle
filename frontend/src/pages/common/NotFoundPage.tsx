import { getDefaultPath } from '@/components/nav/config';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md space-y-6 text-center'>
        {/* 404 Text */}
        <h1 className='text-9xl font-bold text-gray-900'>404</h1>

        {/* Error Message */}
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            Page not found
          </h2>
          <p className='text-gray-600'>
            Sorry, we couldn't find the page you're looking for. Please check
            the URL or try navigating back home.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col justify-center gap-4 pt-6 sm:flex-row'>
          <button
            onClick={() => (window.location.href = getDefaultPath())}
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <Home className='mr-2 h-5 w-5' />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
