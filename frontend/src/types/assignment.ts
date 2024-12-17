export default interface Assignment {
  assignmentId: number;
  courseId: number;
  name: string;
  content: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  canViewScore: boolean;
  canRetry: boolean;
  type: 'file' | 'questions';
  questions: Question[];
}

export interface AssignmentResponse {
  AssignmentId: number;
  CourseId: number;
  Name: string;
  Content: string;
  DueDate: Date | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  CanViewScore: boolean;
  CanRetry: boolean;
  Type: 'file' | 'questions';
  Questions: QuestionResponse[];
}

export interface QuestionResponse {
  QuestionId: number;
  AssignmentId: number;
  Content: string;
  Answers: AnswerResponse[];
  Type: QuestionType;
}

export interface AnswerResponse {
  AnswerId: number;
  QuestionId: number;
  Value: string;
  IsCorrect: boolean;
}

export type CreateAssignmentDto = {
  courseId: number;
  name: string;
  content: string;
  dueDate: Date | null;
  canViewScore: boolean;
  canRetry: boolean;
  type: 'file' | 'questions';
  questions?: CreateQuestionDto[];
};

export type QuestionType = 'Multiple Choice' | 'Fill In Blank';

export interface Question {
  questionId: number;
  assignmentId: number;
  content: string;
  answers: Answer[];
  type: QuestionType;
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
  type: QuestionType;
  answers: CreateAnswerDto[];
  isNew?: boolean;
}

export interface CreateAnswerDto {
  answerId: number;
  value: string;
  isCorrect: boolean;
}

export interface AssignmentSubmitDto {
  assignmentId: number;
  answers: AnswerSubmitDto[];
}

export interface AnswerSubmitDto {
  questionId: number;
  value: string;
}
