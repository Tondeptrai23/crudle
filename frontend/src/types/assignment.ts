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

export type CreateAssignmentDto = {
  courseId: string;
  name: string;
  content: string;
  duedAt: Date | null;
  canViewScore: boolean;
  canRetry: boolean;
  type: 'file' | 'questions';
};

export interface Question {
  questionId: string;
  assignmentId: string;
  content: string;
  answers: Answer[];
  type: 'Multiple Choice' | 'Fill In Blank';
}

export interface Answer {
  answerId: string;
  questionId: string;
  value: string;
  isCorrect: boolean;
}
