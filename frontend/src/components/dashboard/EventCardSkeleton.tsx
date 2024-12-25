import { Card, CardHeader, CardContent } from '@/components/common/ui/card';
import { Skeleton } from '@/components/common/ui/skeleton';

export const EventCardSkeleton = () => (
  <Card className='w-full shadow-lg'>
    <div className='flex flex-col'>
      <CardHeader className='space-y-1'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-6 w-2/3' />
        </div>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
      </CardHeader>
      <CardContent className='pb-3'>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-1/3' />
        </div>
      </CardContent>
    </div>
  </Card>
);
