
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
  ReadAt: string | null;
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
}
