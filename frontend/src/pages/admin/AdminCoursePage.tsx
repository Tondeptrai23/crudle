import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Course {
  CourseId: number;
  Name: string;
}

const fetchCourses = async () => {
  const response = await api.get('/api/Admin/Course');
  return response.data.Data;
};

const AdminCoursePage: React.FC = () => {
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
    throw error;
  }

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course: Course) => (
          <li key={course.CourseId}>{course.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCoursePage;
