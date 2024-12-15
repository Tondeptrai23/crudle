export default interface Assignment {
  assignmentId: number;
  courseId: number;
  name: string;
  content: string;
  duedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  canViewScore: boolean;
  canRetry: boolean;
  type: 'file' | 'questions';
}

export interface AssignmentResponse {
  AssignmentId: number;
  CourseId: number;
  Name: string;
  Content: string;
  DuedAt: Date | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  CanViewScore: boolean;
  CanRetry: boolean;
  Type: 'file' | 'questions';
}

export type CreateAssignmentDto = {
  courseId: number;
  name: string;
  content: string;
  duedAt: Date | null;
  canViewScore: boolean;
  canRetry: boolean;
  type: 'file' | 'questions';
  questions?: CreateQuestionDto[];
};

export interface Question {
  questionId: number;
  assignmentId: number;
  content: string;
  answers: Answer[];
  type: 'Multiple Choice' | 'Fill In Blank';
}

export interface Answer {
  answerId: number;
  questionId: number;
  value: string;
  isCorrect: boolean;
}

export interface CreateQuestionDto {
  questionId: number;
  content: string;
  type: 'Multiple Choice' | 'Fill In Blank';
  answers: CreateAnswerDto[];
  isNew?: boolean;
}

export interface CreateAnswerDto {
  answerId: number;
  value: string;
  isCorrect: boolean;
}
