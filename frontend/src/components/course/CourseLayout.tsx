import PageHeader from '@/components/common/layout/PageHeader';
import Sidebar from '@/components/nav/Sidebar';
import { useCourseDetail } from '@/hooks/api/useCourseApi';
import useAuth from '@/hooks/useAuth';
import React from 'react';
import { useParams } from 'react-router-dom';

interface CourseLayoutProps {
  children: React.ReactNode;
  lastHeaderItem?: string;
}

const CourseLayout: React.FC<CourseLayoutProps> = ({
  children,
  lastHeaderItem,
}) => {
  const { courseId } = useParams();
  const { role } = useAuth();
  const {
    data: course,
    isLoading,
    error,
  } = useCourseDetail(role, courseId ?? '');

  if (isLoading) return <div>Loading...</div>;
  if (error || !course) throw error || new Error('Error loading course');

  const pageHeaderItems = [
    { label: 'Courses', to: '/course' },
    { label: course.name, to: `/course/${courseId}` },
    { label: lastHeaderItem ?? '' },
  ];

  return (
    <>
      <div className='flex min-h-screen flex-row gap-4'>
        <Sidebar />
        <div className='container mx-auto px-4 py-8'>
          <PageHeader items={pageHeaderItems} />

          {children}
        </div>
      </div>
    </>
  );
};

export default CourseLayout;
