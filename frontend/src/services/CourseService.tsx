import Course, {
  CourseResponse,
  CreateCourseDTO,
  UpdateCourseDTO,
} from '@/types/course';
import { ApiResponse } from '@/types/paginationApiResponse';
import api from '@/utils/api';

export default class CourseService {
  async getCoursesByStudent(): Promise<CourseResponse[]> {
    const response = await api.get('/api/Student/Course');
    return response.data.Data;
  }

  getCoursesByAdmin: (data: {
    page?: number;
    size?: number;
    name?: string;
    code?: string[];
    startDateFrom?: string;
    startDateTo?: string;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => Promise<ApiResponse<Course>> = async ({
    page = 1,
    size = 10,
    name,
    code = [],
    startDateFrom,
    startDateTo,
    orderBy = 'CourseId',
    orderDirection = 'asc',
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (page < 1) {
      page = 1;
    }

    let query = `page=${page}&size=${size}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    query += name || name?.length == 0 ? `&name=${name}` : '';
    for (let i = 0; i < code?.length; i++) {
      query += code[i] || code[i].length == 0 ? `&code=${code[i]}` : '';
    }
    query +=
      startDateFrom || startDateFrom?.length == 0
        ? `&startDateFrom=${startDateFrom}`
        : '';
    query +=
      startDateTo || startDateTo?.length == 0
        ? `&startDateTo=${startDateTo}`
        : '';

    const response = await api.get(`/api/admin/course?${query}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    let courses: Course[] = response.data.Data.map((course: CourseResponse) => {
      return {
        id: course.CourseId,
        name: course.Name,
        code: course.Code,
        description: course.Description,
        startDate: course.StartDate,
        teacherName: course.Teacher?.Fullname ?? '',
        teacherId: course.Teacher?.TeacherId ?? '',
      };
    });

    return {
      data: courses,
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };
  };

  createCourse = async (data: CreateCourseDTO) => {
    const response = await api.post('/api/admin/course', data);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  };

  updateCourse = async (id: string, data: UpdateCourseDTO) => {
    data.teacherId = null;
    const response = await api.patch(`/api/admin/course/${id}`, data);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  };
}

export const mapToCourse = (response: CourseResponse) => ({
  id: response.CourseId.toString(),
  name: response.Name,
  description: response.Description,
  code: response.Code,
  startDate: response.StartDate,
  teacherId: response.Teacher.TeacherId.toString(),
  teacherName: response.Teacher.Fullname,
});
