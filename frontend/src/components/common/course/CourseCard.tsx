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
  <div className='mt-4'>
    <h4 className='mb-2 text-lg font-medium'>Instructors</h4>
    <ul className='list-none space-y-1'>
      {teachers?.map((teacher) => (
        <Link
          key={teacher.TeacherId}
          to={`/teacher/${teacher.TeacherId}`}
          className='block'
          onClick={(e) => e.stopPropagation()}
        >
          <li className='flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:underline'>
            <span className='h-2 w-2 rounded-full bg-primary' />
            {teacher.Fullname}
          </li>
        </Link>
      ))}
    </ul>
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
