import { Skeleton } from '@/components/common/ui/skeleton';
import React from 'react';
import { Card, CardContent, CardHeader } from '../common/ui/card';

const CourseSkeleton: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Skeleton className='mb-8 h-10 w-48' />
      <div className='grid w-full gap-6'>
        {[...Array(3)].map((_, index) => (
          <Card key={index} className='w-full shadow-lg'>
            <div className='flex flex-col'>
              <CardHeader className='space-y-2'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-6 w-6 rounded-full' />
                  <Skeleton className='h-8 w-64' />
                </div>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </CardHeader>

              <CardContent>
                <div className='mt-4 flex items-center gap-2'>
                  <Skeleton className='h-6 w-24' />
                  <Skeleton className='h-6 w-32' />
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseSkeleton;
