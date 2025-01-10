import { QuestionType } from './assignment';

export interface Exam {
  examId: number;
  courseId: number;
  name: string;
  content: string;
  duration: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  questions: ExamQuestion[];
  numberOfSubmissions?: number;
}

export interface ExamQuestion {
  questionId: number;
  examId: number;
  content: string;
  answers: ExamAnswer[];
  type: QuestionType;
}

export interface ExamAnswer {
  answerId: number;
  questionId: number;
  value: string;
  isCorrect: boolean;
}

export interface UpcomingExam {
  examId: string;
  name: string;
  startDate: Date;
  duration: number;
  courseName: string;
  courseId: string;
  hasAttempted: boolean;
}

export interface CreateExamDto {
  courseId: number;
  name: string;
  content: string;
  duration: number;
  startDate: Date;
  questions?: CreateExamQuestionDto[];
}

export interface CreateExamQuestionDto {
  questionId: number;
  content: string;
  type: QuestionType;
  answers: CreateExamAnswerDto[];
  isNew?: boolean;
}

export interface CreateExamAnswerDto {
  answerId: number;
  value: string;
  isCorrect: boolean;
}

export interface ExamSubmitDto {
  examId: number;
  submissionId: number;
  answers: ExamAnswerSubmitDto[];
  submittedAt: Date;
}

export interface ExamAnswerSubmitDto {
  questionId: number;
  value: string;
}

export interface ExamStartDto {
  submissionId: number;
  examId: number;
  startedAt: Date;
  duration: number;
  questions: ExamQuestion[];
}

export interface ExamResponse {
  ExamId: number;
  CourseId: number;
  Name: string;
  Content: string;
  Duration: number;
  StartDate: Date;
  EndDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
  Questions: ExamQuestionResponse[];
  NumberOfSubmissions?: number;
}

export interface ExamQuestionResponse {
  QuestionId: number;
  ExamQuestionId: number;
  ExamId: number;
  Content: string;
  Answers: ExamAnswerResponse[];
  Type: QuestionType;
}

export interface ExamAnswerResponse {
  AnswerId: number;
  ExamAnswerId: number;
  ExamQuestionId: number;
  Value: string;
  IsCorrect: boolean;
}
