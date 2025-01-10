import { Article } from '@/types/article';
import { UpcomingAssignment } from '@/types/assignment';
import { UpcomingExam } from '@/types/exam';
import { ApiResponse } from '@/types/paginationApiResponse';
import Student, {
  CreateStudentDTO,
  mapToStudent,
  UpdateStudentDTO,
} from '@/types/student';
import api from '@/utils/api';

export default class StudentService {
  getStudentsByAdmin: (data: {
    page?: number;
    size?: number;
    studentId?: string;
    fullname?: string;
    dobFrom?: string;
    dobTo?: string;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => Promise<ApiResponse<Student>> = async ({
    page = 1,
    size = 10,
    studentId,
    fullname,
    dobFrom,
    dobTo,
    orderBy = 'StudentId',
    orderDirection = 'asc',
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (page < 1) {
      page = 1;
    }

    let query = `page=${page}&size=${size}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    query +=
      studentId || studentId?.length == 0 ? `&studentId=${studentId}` : '';
    query += fullname || fullname?.length == 0 ? `&fullname=${fullname}` : '';

    // Handle date range
    if (dobFrom || dobFrom?.length == 0) {
      query += `&dateOfBirthFrom=${dobFrom}`;
    }

    if (dobTo || dobTo?.length == 0) {
      query += `&dateOfBirthTo=${dobTo}`;
    }

    const response = await api.get(`/api/admin/student?${query}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return {
      data: response.data.Data.map(mapToStudent),
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };
  };

  addStudent: (data: CreateStudentDTO) => Promise<void> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await api.post('/api/admin/student', {
      fullname: data.fullname,
      password: data.password,
      email: data.email,
      dateOfBirth: data.dob,
    });

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }
  };

  updateStudent: (id: string, data: UpdateStudentDTO) => Promise<void> = async (
    id,
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await api.patch(`/api/admin/student/${id}`, {
      fullname: data.fullname,
      dateOfBirth: data.dob,
    });

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }
  };

  getStudentById: (id: string) => Promise<Student> = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const response = await api.get(`/api/student/${id}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return mapToStudent(response.data.Data);
  };

  getUpcomingAssignments: (date: Date) => Promise<UpcomingAssignment[]> =
    async (date: Date) => {
      try {
        const query = `month=${date.getMonth()}&year=${date.getFullYear()}`;
        const response = await api.get(
          `api/student/assignment/upcoming?${query}`,
        );

        if (!response.data.Success) {
          throw new Error(response.data.Message);
        }
        return response.data.Data.map((assignment: any) => {
          return {
            assignmentId: assignment.AssignmentId,
            name: assignment.Name,
            dueDate: new Date(assignment.DueDate),
            courseId: assignment.CourseId,
            courseName: assignment.CourseName,
          };
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch assignments: ${error.message}`);
        }
        throw error;
      }
    };

  getUpcomingExams: (date: Date) => Promise<UpcomingExam[]> = async (
    date: Date,
  ) => {
    try {
      const query = `month=${date.getMonth()}&year=${date.getFullYear()}`;
      const response = await api.get(`api/student/exam/upcoming?${query}`);

      if (!response.data.Success) {
        throw new Error(response.data.Message);
      }

      return response.data.Data.map((exam: any) => {
        return {
          examId: exam.ExamId,
          name: exam.Name,
          startDate: new Date(exam.StartDate),
          courseId: exam.CourseId,
          courseName: exam.CourseName,
          duration: exam.Duration,
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch exams: ${error.message}`);
      }
      throw error;
    }
  };

  getNotSubmittedAssignments: () => Promise<UpcomingAssignment[]> =
    async () => {
      try {
        const response = await api.get(`api/student/assignment/notdone`);

        if (!response.data.Success) {
          throw new Error(response.data.Message);
        }

        return response.data.Data.map((assignment: any) => {
          return {
            assignmentId: assignment.AssignmentId,
            name: assignment.Name,
            dueDate: new Date(assignment.DueDate),
            courseId: assignment.CourseId,
            courseName: assignment.CourseName,
          };
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch assignments: ${error.message}`);
        }
        throw error;
      }
    };

  getNotReadArticles: () => Promise<Article[]> = async () => {
    try {
      const response = await api.get(`api/student/article/notread`);

      if (!response.data.Success) {
        throw new Error(response.data.Message);
      }

      return response.data.Data.map((article: any) => {
        return {
          id: article.ArticleId,
          title: article.Title,
          summary: article.Summary,
          courseId: article.CourseId,
          courseName: article.CourseName,
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch assignments: ${error.message}`);
      }
      throw error;
    }
  };
}
