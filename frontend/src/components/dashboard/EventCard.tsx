import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../common/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../common/ui/card';

interface EventCardProps {
  type: 'assignment' | 'exam';
  name: string;
  dueTime: Date;
  courseName: string;
  courseId: string;
  id: string;
  duration?: number;
}

const EventCard: React.FC<EventCardProps> = ({
  type,
  name,
  dueTime,
  courseName,
  courseId,
  id,
  duration,
}) => {
  const isExam = type === 'exam';
  const now = new Date();
  const examEndTime = new Date(dueTime.getTime() + (duration || 0) * 60000);
  const canAccess = isExam ? now >= dueTime && now <= examEndTime : true;

  const getStatusBadge = () => {
    if (!isExam) return null;

    if (now < dueTime) {
      return <Badge variant='outline'>Scheduled</Badge>;
    }

    if (now > examEndTime) {
      return <Badge variant='destructive'>Ended</Badge>;
    }

    if (canAccess) {
      return <Badge variant='default'>In Progress</Badge>;
    }

    return <Badge variant='secondary'>Unavailable</Badge>;
  };

  const getTypeLabel = () => {
    return (
      <Badge variant='outline' className='mr-2'>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <Link
      to={`/course/${courseId}/${type}/${id}`}
      className={cn('block', !canAccess && 'opacity-60')}
    >
      <Card className='w-full shadow-lg transition-shadow hover:shadow-xl'>
        <CardHeader className='relative pb-2'>
          {/* Course info moved to top right */}
          <div className='absolute right-6 top-6'>
            <Link
              to={`/course/${courseId}`}
              className='inline-flex items-center'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='text-sm text-gray-600 hover:text-gray-900 hover:underline'>
                Course: {courseName}
              </div>
            </Link>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <CardTitle className='text-xl font-semibold'>
                {getTypeLabel()}
                {name}
                <div className='ml-2 inline-block'>{getStatusBadge()}</div>
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span className='font-medium'>
                {isExam ? 'Start Time: ' : 'Due Date: '}
                {dueTime.toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {isExam && duration && (
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                <span className='font-medium'>
                  Duration: {duration} minutes
                </span>
              </div>
            )}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
