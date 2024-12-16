
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
}

export interface ArticleRequest {
  title: string;
  summary: string;
  content: string;
};
