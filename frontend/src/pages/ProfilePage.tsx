// src/pages/ProfilePage.tsx
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import api from '@/utils/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card';
import { Avatar, AvatarFallback } from '@/components/common/ui/avatar';
import { Skeleton } from '@/components/common/ui/skeleton';
import { User, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileData {
  Email: string;
  StudentId: number;
  Fullname: string;
  DateOfBirth: string;
  UserId: string;
}

const ProfilePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get<{ Success: boolean; Data: ProfileData }>(
        '/api/User/me',
      );
      return response.data.Data;
    },
  });

  if (isLoading) {
    return (
      <div className='container mx-auto max-w-6xl p-8'>
        <div className='grid grid-cols-[300px_1fr] gap-8'>
          {/* Left Column - Profile Image */}
          <div className='space-y-4'>
            <Skeleton className='m-[20px] mb-[40px] h-[260px] w-[260px] rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-6 w-32' />
            </div>
          </div>
          {/* Right Column - Profile Details */}
          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-24' />
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4'>
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>

                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>

                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>

                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-36' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-4 w-full' />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-6xl p-8'>
      <div className='grid grid-cols-[300px_1fr] gap-8'>
        {/* Left Column - Profile Image */}
        <div className='space-y-4'>
          <Avatar className='m-[20px] mb-[40px] h-[260px] w-[260px] rounded-full'>
            <AvatarFallback className='text-4xl'>
              <User className='h-32 w-32' />
            </AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <h1 className='text-3xl font-semibold'>{data?.Fullname}</h1>
            <p className='text-xl text-muted-foreground'>Student</p>
          </div>
        </div>
        {/* Right Column - Profile Details */}
        <div className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Student ID</p>
                  <p className='text-sm text-muted-foreground'>
                    {data?.StudentId}
                  </p>
                </div>

                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Email</p>
                  <p className='text-sm text-muted-foreground'>{data?.Email}</p>
                </div>

                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Date of Birth</p>
                  <p className='text-sm text-muted-foreground'>
                    {data?.DateOfBirth &&
                      format(new Date(data.DateOfBirth), 'PPP')}
                  </p>
                </div>

                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Password</p>
                  <Link
                    to='/change-password'
                    className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary'
                  >
                    <KeyRound className='h-4 w-4' />
                    Change password
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>No enrolled course.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
