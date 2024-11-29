import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Accordion } from '@radix-ui/react-accordion';
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
      const response = await api.get(`/api/Student/Course/${courseId}`);
      return response.data.Data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='lg:text-54l mb-8 scroll-m-20 text-4xl font-bold tracking-tight'>
        {course.Name}
      </h1>
      <div className='prose max-w-none'>
        <h2 className='text-2xl font-semibold'>Description</h2>
        <p>{course.Description}</p>

        <h2 className='mt-8 text-2xl font-semibold'>Instructors</h2>
        {/* <ul>
          {course.Teachers?.map((teacher) => (
            <li key={teacher.TeacherId}>{teacher.Name}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default CourseDetailPage;
