export default interface Assignment {
  assignmentId: string;
  courseId: string;
  name: string;
  content: string;
  duedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  canViewScore: boolean;
  canRetry: boolean;
  type: 'file' | 'questions';
}
