import { TeacherResponse } from './teacher';

export interface CourseResponse {
  CourseId: string;
  Name: string;
  Description: string;
  Code: string;
  StartDate: string;
  Teacher: TeacherResponse;
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
