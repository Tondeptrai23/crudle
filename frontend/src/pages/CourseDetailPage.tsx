import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { CourseResponse } from '@/types/course';
import Course from '@/types/course';

const mapToCourseDetail = (response: CourseResponse): Course => ({
  id: response.CourseId.toString(),
  name: response.Name,
  description: response.Description,
  code: response.Code,
  startDate: response.StartDate,
  teacherId: response.Teacher.TeacherId.toString(),
  teacherName: response.Teacher.Fullname,
});

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams();

  const {
    data: courseResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async (): Promise<CourseResponse> => {
      const response = await api.get(`/api/Student/Course/${courseId}`);
      return response.data.Data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course</div>;
  if (!courseResponse) return <div>No course found</div>;

  const course = mapToCourseDetail(courseResponse);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl'>
        {course.name}
      </h1>
      <div className='prose max-w-none'>
        <h2 className='text-2xl font-semibold'>Description</h2>
        <p>{course.description}</p>

        <h2 className='mt-8 text-2xl font-semibold'>Instructor</h2>
        <div className='mt-4'>
          <Link
            to={`/teacher/${course.teacherId}`}
            className='text-lg text-gray-600 hover:text-gray-900 hover:underline'
          >
            {course.teacherName}
          </Link>
        </div>

        <div className='mt-8'>
          <h2 className='text-2xl font-semibold'>Course Details</h2>
          <div className='mt-4'>
            <p>
              <strong>Course Code:</strong> {course.code}
            </p>
            <p>
              <strong>Start Date:</strong>{' '}
              {new Date(course.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
