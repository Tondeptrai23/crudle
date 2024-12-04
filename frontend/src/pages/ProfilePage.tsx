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
import { User } from 'lucide-react';

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
      <div className='container mx-auto p-8'>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className='space-y-8'>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-20 w-20 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-8'>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className='space-y-8'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-20 w-20'>
              <AvatarFallback>
                <User className='h-10 w-10' />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-2xl font-bold'>{data?.Fullname}</h2>
              <p className='text-muted-foreground'>Student</p>
            </div>
          </div>

          <div className='grid gap-4'>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Email</p>
              <p className='text-sm text-muted-foreground'>{data?.Email}</p>
            </div>

            <div className='space-y-1'>
              <p className='text-sm font-medium'>Student ID</p>
              <p className='text-sm text-muted-foreground'>{data?.StudentId}</p>
            </div>

            <div className='space-y-1'>
              <p className='text-sm font-medium'>Date of Birth</p>
              <p className='text-sm text-muted-foreground'>
                {data?.DateOfBirth && format(new Date(data.DateOfBirth), 'PPP')}
              </p>
            </div>

            <div className='space-y-1'>
              <p className='text-sm font-medium'>User ID</p>
              <p className='text-sm text-muted-foreground'>{data?.UserId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
