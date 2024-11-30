import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../common/ui/card';
import Course from '@/types/course';

interface TeacherInfoProps {
  teacherId: string;
  teacherName: string;
}

const TeacherInfo: React.FC<TeacherInfoProps> = ({
  teacherId,
  teacherName,
}) => {
  if (!teacherName) {
    return <div className='mt-4 text-gray-500'>No instructor assigned</div>;
  }

  return (
    <div className='mt-4 flex items-center gap-2'>
      <div className='text-lg font-medium'>Instructor:</div>
      <Link
        to={`/teacher/${teacherId}`}
        className='inline-flex items-center'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center gap-2 text-lg text-gray-600 hover:text-gray-900 hover:underline'>
          {teacherName}
        </div>
      </Link>
    </div>
  );
};

export const CourseCard: React.FC<Course> = ({
  id,
  name,
  description,
  teacherId,
  teacherName,
  code,
  startDate,
}) => {
  return (
    <Link to={`/course/${id}`} className='block'>
      <Card className='w-full shadow-lg transition-shadow hover:shadow-xl'>
        <div className='flex flex-col'>
          <CardHeader className='space-y-2'>
            <div className='flex items-center gap-3'>
              <Book className='h-6 w-6 text-primary' />
              <CardTitle className='text-2xl font-semibold'>{name}</CardTitle>
            </div>
            <CardDescription className='text-gray-600'>
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TeacherInfo teacherId={teacherId} teacherName={teacherName} />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
