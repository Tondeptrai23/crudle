import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { CourseResponse } from '@/types/course';
import Course from '@/types/course';
import useAuth from '@/hooks/useAuth';
import PageHeader from '@/components/common/layout/PageHeader';
import CourseTabs from '@/components/course/CourseTabs';
import CourseInfo from '@/components/course/CourseInfo';
import CourseInstructor from '@/components/course/CourseInstructor';

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
  const [activeTab, setActiveTab] = useState<'articles' | 'assignments'>('articles');

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
        items={[
          { label: 'Courses', to: '/course' },
          { label: course.name }
        ]}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <CourseTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            courseId={course.id}
          />
        </div>

        <div className="lg:col-span-1 order-1 lg:order-2">
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
