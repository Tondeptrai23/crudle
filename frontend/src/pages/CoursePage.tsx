import api from '@/utils/api';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface Course {
  CourseId: number;
  Name: string;
}

const fetchCourses = async () => {
  const response = await api.get('/api/Admin/Course');
  return response.data.Data;
};

const CoursePage: React.FC = () => {
  const { data: courses, isPending, error } = useQuery({ 
    queryKey: ['courses'], 
    queryFn: fetchCourses 
  });

  if (isPending) return <div>Loading...</div>;

  if (error) {
    if ((error as AxiosError).response?.status === 401) {
      return <Navigate to="/login" />;
    }
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

export default CoursePage;
