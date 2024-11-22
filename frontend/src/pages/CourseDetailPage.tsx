import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

interface CourseDetails {
  CourseId: number;
  Name: string;
  Description: string;
  Teachers: Teacher[];
  // Add other details you want to display
}

interface Teacher {
  TeacherId: number;
  Name: string;
}

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const response = await api.get(`/api/Admin/Course/${courseId}`);
      return response.data.Data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      test
      {/* <h1 className='mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        {course.Name}
      </h1>
      <div className='prose max-w-none'>
        <h2 className='text-2xl font-bold'>Description</h2>
        <p>{course.Description}</p>

        <h2 className='mt-8 text-2xl font-bold'>Instructors</h2>
        <ul>
          {course.Teachers?.map((teacher) => (
            <li key={teacher.TeacherId}>{teacher.Name}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default CourseDetailPage;
