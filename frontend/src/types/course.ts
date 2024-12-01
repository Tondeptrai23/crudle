import { TeacherResponse } from './teacher.ts';

export interface CourseResponse {
  CourseId: string;
  Name: string;
  Description: string;
  Code: string;
  StartDate: string;
  Teacher: TeacherResponse;
}

export interface ArticleResponse {
  IsRead: boolean;
  ArticleId: number;
  CourseId: number;
  Title: string;
  Summary: string;
  Content: string;
  Order: number;
  CreatedAt: string;
  UpdatedAt: string;
  ReadAt: string | null;
}

export default interface Course {
  id: string;
  name: string;
  description: string;
  startDate: string;
  code: string;
  teacherName: string;
  teacherId: string;
}

export interface CreateCourseDTO {
  name: string;
  description: string;
  startDate: string;
  code: string;
}

export interface UpdateCourseDTO {
  name: string;
  description: string;
  teacherId: string | null;
}

export interface Article {
  courseId: string;
  id: string;
  title: string;
  summary: string;
  order: number;
  isRead: boolean;
  readAt: string;
}