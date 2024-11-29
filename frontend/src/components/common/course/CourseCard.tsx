import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';

interface Teacher {
  TeacherId: number;
  Fullname: string;
}

interface CourseCardProps {
  CourseId: number;
  Name: string;
  Description: string;
  Teachers: Teacher[];
}

const TeachersList: React.FC<{ teachers: Teacher[] }> = ({ teachers }) => (
  <div className='mt-4 flex items-center gap-2'>
    <div className='text-lg font-medium'>Instructor:</div>
    <div className='flex flex-wrap gap-4'>
      {teachers?.map((teacher, index) => (
        <Link
          key={teacher.TeacherId}
          to={`/teacher/${teacher.TeacherId}`}
          className='inline-flex items-center'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex items-center gap-2 text-lg text-gray-600 hover:text-gray-900 hover:underline'>
            {teacher.Fullname}
            {index < teachers.length - 1 && <span className='ml-2'>,</span>}
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export const CourseCard: React.FC<CourseCardProps> = ({
  CourseId,
  Name,
  Description,
  Teachers = [], // Provide default value
}) => (
  <Link to={`/course/${CourseId}`} className='block'>
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
          <TeachersList teachers={Teachers} />
        </CardContent>
      </div>
    </Card>
  </Link>
);

export default CourseCard;
