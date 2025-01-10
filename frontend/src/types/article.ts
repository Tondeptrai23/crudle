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
  ReadAt: Date | null;
  CourseName: string;
}

export interface Article {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  readAt: Date | null;
  courseName: string;
}

export interface ArticleRequest {
  title: string;
  summary: string;
  content: string;
}
