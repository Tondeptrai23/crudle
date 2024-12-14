import Course, {
  CourseResponse,
  CreateCourseDTO,
  UpdateCourseDTO,
} from '@/types/course';
import { Article, ArticleResponse } from '@/types/article';
import { ApiResponse } from '@/types/paginationApiResponse';
import api from '@/utils/api';

export default class CourseService {
  async getCoursesByStudent(): Promise<CourseResponse[]> {
    const response = await api.get('/api/Student/Course');
    return response.data.Data;
  }

  async getCoursesByTeacher(): Promise<CourseResponse[]> {
    const response = await api.get('/api/Teacher/Course');
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

  #getArticles: (role: string, id: string, data: {
    title?: string;
    summary?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    page?: number;
    size?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => Promise<ApiResponse<Article>> = async (role, id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (data.page && data.page < 1) {
      data.page = 1;
    }

    let query = `page=${data.page || 1}&size=${data.size || 10}&orderBy=${data.orderBy || 'createdAt'}&orderDirection=${data.orderDirection || 'asc'}`;
    query += data.title ? `&title=${data.title}` : '';
    query += data.summary ? `&summary=${data.summary}` : '';
    query += data.content ? `&content=${data.content}` : '';
    query += data.createdAt ? `&createdAt=${data.createdAt}` : '';
    query += data.updatedAt ? `&updatedAt=${data.updatedAt}` : '';

    const response = await api.get(`/api/${role}/course/${id}/articles?${query}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    const articles: Article[] = response.data.Data.map((article: ArticleResponse) => {
      return {
        id: article.ArticleId,
        title: article.Title, 
        summary: article.Summary,
        content: article.Content,
        createdAt: article.CreatedAt,
        updatedAt: article.UpdatedAt,
      };
    });

    return {
      data: articles,
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };
  };

  getArticlesByTeacher = async (id: string, data: {
    title?: string;
    summary?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    page?: number;
    size?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => {
    return this.#getArticles('Teacher', id, data);
  };

  getArticlesByStudent = async (id: string, data: {
    title?: string;
    summary?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    page?: number;
    size?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => {
    return this.#getArticles('Student', id, data);
  };

  #getArticleDetail: (role: string, courseId: string, articleId: string) => Promise<Article> = async (role, courseId, articleId) => {
    const response = await api.get(`/api/${role}/course/${courseId}/article/${articleId}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return {
      id: response.data.Data.ArticleId,
      courseId: response.data.Data.CourseId,
      title: response.data.Data.Title,
      summary: response.data.Data.Summary,
      content: response.data.Data.Content,
      order: response.data.Data.Order,
      createdAt: response.data.Data.CreatedAt,
      updatedAt: response.data.Data.UpdatedAt,
      isRead: response.data.Data.IsRead,
    };
  };

  getArticleDetailByTeacher = async (courseId: string, articleId: string) => {
    return this.#getArticleDetail('Teacher', courseId, articleId);
  };

  getArticleDetailByStudent = async (courseId: string, articleId: string) => {
    return this.#getArticleDetail('Student', courseId, articleId);
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
  teacherId: response.Teacher?.TeacherId.toString(),
  teacherName: response.Teacher?.Fullname,
});
