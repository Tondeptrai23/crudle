import { CourseCard } from '@/components/course/CourseCard';
import CourseSkeleton from '@/components/course/CourseSkeleton';
import { useRoleBasedCourses } from '@/hooks/api/useCourseApi';
import useAuth from '@/hooks/useAuth';
import React from 'react';

const CoursePage: React.FC = () => {
  const { role } = useAuth();
  const {
    data: courses,
    isLoading: isLoading,
    error: error,
  } = useRoleBasedCourses(role, { enabled: true });

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <CourseSkeleton />
      </div>
    );
  }

  if (error) {
    throw error;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl'>
        Courses
      </h1>
      <div className='grid w-full gap-6'>
        {courses?.map((course) => <CourseCard key={course.id} {...course} />)}
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
