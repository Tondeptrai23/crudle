import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/ui/card';
import { Skeleton } from "@/components/common/ui/skeleton"

export const SkeletonWeatherCard: React.FC = () => {
  return (
    <Card className='flex flex-row justify-between w-fit items-center'>
      <div>
        <CardHeader>
          <Skeleton className="h-8 w-[150px]" /> {/* Location */}
          <Skeleton className="h-4 w-[100px] mt-2" /> {/* Condition */}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-[100px]" /> {/* Temperature */}
        </CardContent>
      </div>
      <div className='p-6 pl-0'>
        <Skeleton className="h-32 w-32 rounded-full" /> {/* Weather icon */}
      </div>
    </Card>
  );
};