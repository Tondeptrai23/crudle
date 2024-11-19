import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  CourseId: number;
  Name: string;
  Description: string;
  Teachers: Teacher[];
}

interface Teacher {
  TeacherId: number;
  Name: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  CourseId,
  Name,
  Description,
  Teachers,
}) => {
  return (
    <Link to={`/course/${CourseId}`}>
      <Card className='w-full shadow-lg transition-shadow hover:shadow-xl'>
        <div className='flex flex-col'>
          <CardHeader className='space-y-2'>
            <div className='flex items-center gap-3'>
              <Book className='h-6 w-6 text-primary' />
              <CardTitle className='text-2xl font-semibold'>{Name}</CardTitle>
            </div>
            <CardDescription className='text-gray-600'>
              {Description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className='mt-4'>
              <h4 className='mb-2 text-lg font-medium'>Instructors</h4>
              <ul className='list-none space-y-1'>
                {Teachers?.map((teacher) => (
                  <Link
                    key={teacher.TeacherId}
                    to={`/teacher/${teacher.TeacherId}`}
                    className='block'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <li
                      key={teacher.TeacherId}
                      className='flex items-center gap-2 text-gray-600 hover:text-gray-900'
                    >
                      <span className='h-2 w-2 rounded-full bg-primary' />
                      teacher.Name
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
