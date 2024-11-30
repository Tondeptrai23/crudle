import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { CourseCard } from '@/components/course/CourseCard';
import { Breadcrumb } from '@/components/common/ui/breadcrumb';
import React from 'react';
import { CourseResponse } from '@/types/course';
import Course from '@/types/course';
import CourseSkeleton from '@/components/course/CourseSkeleton';

const mapToCourse = (response: CourseResponse): Course => ({
  id: response.CourseId.toString(),
  name: response.Name,
  description: response.Description,
  code: response.Code,
  startDate: response.StartDate,
  teacherId: response.Teacher.TeacherId.toString(),
  teacherName: response.Teacher.Fullname,
});

const fetchCourses = async (): Promise<CourseResponse[]> => {
  const response = await api.get('/api/Student/Course');
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

  if (isPending)
    return (
      <div className='container mx-auto px-4 py-8'>
        <CourseSkeleton />
      </div>
    );

  if (error) {
    throw error;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl'>
        Courses
      </h1>
      <div className='grid w-full gap-6'>
        {courses?.map((course) => (
          <CourseCard key={course.CourseId} {...mapToCourse(course)} />
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
