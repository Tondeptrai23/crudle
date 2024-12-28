import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/common/ui/alert';
import { Button } from '@/components/common/ui/button';
import {
  ForbiddenError,
  NotFoundError,
  RefreshTokenExpiredError,
  ServerError,
  UnauthorizedError,
} from '@/types/error';
import { XCircle } from 'lucide-react';

interface ErrorPageProps {
  error?: Error;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  const goHome = () => (window.location.href = '/');

  const getErrorDetails = () => {
    switch (error?.name) {
      case UnauthorizedError.name:
        return {
          title: 'Unauthorized',
          message: 'You are not authorized to view this page.',
          button: 'Go Home',
        };
      case ForbiddenError.name:
        return {
          title: 'Forbidden',
          message: 'You do not have permission to view this page.',
          button: 'Go Home',
        };
      case NotFoundError.name:
        return {
          title: 'Not Found',
          message: 'The page you are looking for does not exist.',
          button: 'Go Home',
        };
      case ServerError.name:
        return {
          title: 'Server Error',
          message:
            'An error occurred while processing your request. Please try again later.',
          button: 'Go Home',
        };
      case RefreshTokenExpiredError.name:
        return {
          title: 'Session Expired',
          message: 'Your session has expired. Please log in again.',
          button: 'Log In',
        };
      default:
        return {
          title: 'An error occurred',
          message: 'An unexpected error occurred. Please try again later.',
          button: 'Go Home',
        };
    }
  };

  const errorInfo = getErrorDetails();

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-6'>
        <div className='text-center'>
          <XCircle className='mx-auto h-12 w-12 text-red-500' />
          <h1 className='mt-4 text-3xl font-bold'>{errorInfo.title}</h1>
          <p className='mt-2 text-gray-600'>{errorInfo.message}</p>
        </div>

        {error && process.env.NODE_ENV === 'development' && (
          <Alert variant='destructive'>
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription className='mt-2 font-mono text-sm'>
              {error.toString()}
            </AlertDescription>
          </Alert>
        )}

        <div className='flex justify-center gap-4'>
          <Button onClick={goHome}>{errorInfo.button}</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
