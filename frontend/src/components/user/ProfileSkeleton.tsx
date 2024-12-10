import React from 'react';
import { Card, CardHeader, CardContent } from '../common/ui/card';
import { Skeleton } from '@/components/common/ui/skeleton';

export const ProfileSkeleton: React.FC = () => {
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
};
