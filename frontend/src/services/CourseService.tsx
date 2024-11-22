import Course, { CourseResponse } from '@/types/course';
import { ApiResponse } from '@/types/paginationApiResponse';
import api from '@/utils/api';

export default class CourseService {
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
    code,
    startDateFrom,
    startDateTo,
    orderBy = 'CourseId',
    orderDirection = 'asc',
  }) => {
    if (page < 1) {
      page = 1;
    }

    let query = `page=${page}&size=${size}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    query += name ? `&name=${name}` : '';
    query += code ? `&code=${code}` : '';
    query += startDateFrom ? `&startDateFrom=${startDateFrom}` : '';
    query += startDateTo ? `&startDateTo=${startDateTo}` : '';

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
        teacherName: course.Teacher.Fullname,
        teacherId: course.Teacher.TeacherId,
      };
    });

    return {
      data: courses,
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };
  };
}
