import { UpcomingAssignment } from '@/types/assignment';
import { ApiResponse } from '@/types/paginationApiResponse';
import Teacher, {
  CreateTeacherDTO,
  TeacherCollectionResponse,
  UpdateTeacherDTO,
} from '@/types/teacher';
import api from '@/utils/api';

export default class TeacherService {
  getTeachersByAdmin: (data: {
    page?: number;
    size?: number;
    teacherId?: string;
    fullname?: string;
    contactEmailDomain?: string[];
    contactPhone?: string;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => Promise<ApiResponse<Teacher>> = async ({
    page = 1,
    size = 10,
    teacherId,
    fullname,
    contactEmailDomain = [],
    contactPhone,
    orderBy = 'TeacherId',
    orderDirection = 'asc',
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (page < 1) {
      page = 1;
    }

    let query = `page=${page}&size=${size}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    query +=
      teacherId || teacherId?.length == 0 ? `&teacherId=${teacherId}` : '';
    query += fullname || fullname?.length == 0 ? `&fullname=${fullname}` : '';
    query +=
      contactPhone || contactPhone?.length == 0
        ? `&contactPhone=${contactPhone}`
        : '';

    for (let i = 0; i < contactEmailDomain?.length; i++) {
      query +=
        contactEmailDomain[i] || contactEmailDomain[i].length == 0
          ? `&contactEmail=${contactEmailDomain[i]}`
          : '';
    }

    const response = await api.get(`/api/admin/teacher?${query}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    let teachers: Teacher[] = response.data.Data.map(
      (teacher: TeacherCollectionResponse) => {
        return {
          id: teacher.TeacherId,
          fullname: teacher.Fullname,
          contactEmail: teacher.ContactEmail,
          contactPhone: teacher.ContactPhone,
        };
      },
    );

    return {
      data: teachers,
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };
  };

  addTeacher: (data: CreateTeacherDTO) => Promise<void> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await api.post('/api/admin/teacher', data);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }
  };

  updateTeacher: (id: string, data: UpdateTeacherDTO) => Promise<void> = async (
    id,
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await api.patch(`/api/admin/teacher/${id}`, data);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }
  };

  getTeacherById: (id: string) => Promise<Teacher> = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await api.get(`/api/teacher/${id}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    const teacher: Teacher = {
      id: response.data.Data.TeacherId,
      fullname: response.data.Data.Fullname,
      contactEmail: response.data.Data.ContactEmail,
      contactPhone: response.data.Data.ContactPhone,
    };

    return teacher;
  };

  getUpcomingAssignments: (date: Date) => Promise<UpcomingAssignment[]> =
    async (date: Date) => {
      try {
        const query = `month=${date.getMonth()}&year=${date.getFullYear()}`;
        const response = await api.get(
          `api/teacher/assignment/upcoming?${query}`,
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
}
