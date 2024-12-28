import PageHeader from '@/components/common/layout/PageHeader';
import CourseInfo from '@/components/course/CourseInfo';
import CourseInstructor from '@/components/course/CourseInstructor';
import CourseStudents from '@/components/course/CourseStudents';
import CourseTabs from '@/components/course/CourseTabs';
import { useCourseDetail } from '@/hooks/api/useCourseApi';
import useAuth from '@/hooks/useAuth';
import { Role } from '@/types/enums';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

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
    data: course,
    isLoading,
    error,
  } = useCourseDetail(role, courseId ?? '');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course</div>;
  if (!course) return <div>No course found</div>;

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
          {role === Role.Teacher && (
            <CourseStudents students={course.students ?? []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
