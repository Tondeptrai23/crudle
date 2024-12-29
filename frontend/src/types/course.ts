import Student, { StudentResponse } from './student';
import { TeacherResponse } from './teacher';

export interface CourseResponse {
  CourseId: string;
  Name: string;
  Description: string;
  Code: string;
  StartDate: string;
  Teacher: TeacherResponse;
  Students?: StudentResponse[];
}

export default interface Course {
  id: string;
  name: string;
  description: string;
  startDate: string;
  code: string;
  teacherName: string;
  teacherId: string;
  students?: Student[];
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
