import PageHeader from '@/components/common/layout/PageHeader';
import CourseInfo from '@/components/course/CourseInfo';
import CourseInstructor from '@/components/course/CourseInstructor';
import CourseTabs from '@/components/course/CourseTabs';
import useAuth from '@/hooks/useAuth';
import Course, { CourseResponse } from '@/types/course';
import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

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
  const { role } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') ?? 'articles') as
    | 'articles'
    | 'assignments';

  const handleTabChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set('tab', value);
      return prev;
    });
  };

  const {
    data: courseResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async (): Promise<CourseResponse> => {
      const response = await api.get(`/api/${role}/Course/${courseId}`);
      return response.data.Data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course</div>;
  if (!courseResponse) return <div>No course found</div>;

  const course = mapToCourseDetail(courseResponse);

  return (
    <div className='container mx-auto px-4 py-8'>
      <PageHeader
        items={[{ label: 'Courses', to: '/course' }, { label: course.name }]}
      />

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        <div className='order-2 lg:order-1 lg:col-span-3'>
          <CourseTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>

        <div className='order-1 lg:order-2 lg:col-span-1'>
          <CourseInfo course={course} />
          <CourseInstructor
            teacherId={course.teacherId}
            teacherName={course.teacherName}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
