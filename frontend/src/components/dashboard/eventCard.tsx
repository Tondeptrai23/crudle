import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../common/ui/card';

interface EventCardProps {
  assignmentName: string;
  dueTime: Date;
  courseName: string;
  courseId: number;
  assignmentId: number;
}

const EventCard: React.FC<EventCardProps> = ({
  assignmentName,
  dueTime,
  courseName,
  courseId,
  assignmentId,
}) => {
  return (
    <Link
      to={`/course/${courseId}/assignment/${assignmentId}`}
      className='block'
    >
      <Card className='w-full shadow-lg transition-shadow hover:shadow-xl'>
        <div className='flex flex-col'>
          <CardHeader className='space-y-2'>
            <div className='flex items-center gap-3'>
              <CardTitle className='text-xl font-semibold'>
                {assignmentName}
              </CardTitle>
            </div>
            <CardDescription className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span className='font-medium'>
                Due Date:{' '}
                {dueTime.toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className='pt-0'>
            <div className='mt-4 flex items-center gap-2'>
              <div className='text-lg font-medium'>Course:</div>
              <Link
                to={`/course/${courseId}`}
                className='inline-flex items-center'
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex items-center gap-2 text-lg text-gray-600 hover:text-gray-900 hover:underline'>
                  {courseName}
                </div>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
