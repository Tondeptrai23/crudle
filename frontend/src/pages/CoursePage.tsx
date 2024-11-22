import api from '@/utils/api';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { CourseCard } from '@/components/common/course/CourseCard';
import { Breadcrumb } from '@/components/common/ui/breadcrumb';

interface Course {
  CourseId: number;
  Name: string;
  Description: string;
  Teachers: Teacher[];
}

interface Teacher {
  TeacherId: number;
  Fullname: string;
}

const fetchCourses = async () => {
  const response = await api.get('/api/Admin/Course');
  return response.data.Data;
};

const CoursePage: React.FC = () => {
  const {
    data: courses,
    isPending,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) {
    if ((error as AxiosError).response?.status === 401) {
      return <Navigate to='/login' />;
    }
    return (
      <div>
        <h1 className='mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Error
        </h1>
        <p>Failed to load courses: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Courses', href: '/courses' },
        ]}
      /> */}
      <h1 className='mb-8 scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl'>
        Courses
      </h1>
      <div className='grid w-full gap-6'>
        {courses?.map((course: Course) => (
          <CourseCard
            key={course.CourseId}
            CourseId={course.CourseId}
            Name={course.Name}
            Description={course.Description}
            Teachers={course.Teachers}
          />
        ))}
        {!courses?.length && (
          <p className='col-span-full text-center text-red-500'>
            No courses available
          </p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
