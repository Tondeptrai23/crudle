import { Article, ArticleResponse } from "@/types/article";
import { ApiResponse } from "@/types/paginationApiResponse";
import api from "@/utils/api";

export default class ArticleService {
  #getArticles: (role: string, id: string, data: {
    title?: string;
    summary?: string;
    content?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    updatedAtFrom?: string;
    updatedAtTo?: string;
    page?: number;
    size?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) => Promise<ApiResponse<Article>> = async (role, id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (data.page && data.page < 1) {
      data.page = 1;
    }

    let query = `Page=${data.page || 1}&Size=${data.size || 10}&OrderBy=${data.orderBy || 'createdAt'}&OrderDirection=${data.orderDirection || 'asc'}`;
    query += data.title ? `&Title=${data.title}` : '';
    query += data.summary ? `&Summary=${data.summary}` : '';
    query += data.content ? `&Content=${data.content}` : '';
    query += data.createdAtFrom ? `&CreatedAtFrom=${data.createdAtFrom}` : '';
    query += data.createdAtTo ? `&CreatedAtTo=${data.createdAtTo}` : '';
    query += data.updatedAtFrom ? `&UpdatedAtFrom=${data.updatedAtFrom}` : '';
    query += data.updatedAtTo ? `&UpdatedAtTo=${data.updatedAtTo}` : '';

    const response = await api.get(`/api/${role}/Course/${id}/Articles?${query}`);

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
        isRead: article.IsRead,
        readAt: article.ReadAt,
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
      readAt: response.data.Data.ReadAt,
    };
  };

  getArticleDetailByTeacher = async (courseId: string, articleId: string) => {
    return this.#getArticleDetail('Teacher', courseId, articleId);
  };

  getArticleDetailByStudent = async (courseId: string, articleId: string) => {
    return this.#getArticleDetail('Student', courseId, articleId);
  };

  readArticle = async (courseId: string, articleId: string) => {
    const response = await api.post(`/api/student/course/${courseId}/article/${articleId}/read`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  };

  createArticle = async (courseId: string, data: {
    title: string;
    summary: string;
    content: string;
  }) => {
    const response = await api.post(`/api/teacher/course/${courseId}/article`, {
      title: data.title,
      summary: data.summary,
      content: data.content,
    });

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  };

  updateArticle = async (courseId: string, articleId: string, data: {
    title: string;
    summary: string;
    content: string;
  }) => {
    const response = await api.put(`/api/teacher/course/${courseId}/article/${articleId}`, {
      title: data.title,
      summary: data.summary,
      content: data.content,
    });

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  };

  deleteArticle = async (courseId: string, articleId: string) => {
    const response = await api.delete(`/api/teacher/course/${courseId}/article/${articleId}`);

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  };
}