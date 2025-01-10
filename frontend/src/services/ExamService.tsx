import {
  CreateExamDto,
  Exam,
  ExamAnswerResponse,
  ExamQuestionResponse,
  ExamResponse,
  ExamStartDto,
  ExamSubmission,
  ExamSubmissionDto,
  ExamSubmissionStatus,
  ExamSubmitDto,
} from '@/types/exam';
import { ApiResponse } from '@/types/paginationApiResponse';
import api from '@/utils/api';

export default class ExamService {
  async getExamsForTeacher(
    courseId: number,
    serviceData: {
      page?: number;
      size?: number;
      name?: string;
      orderBy: string;
      orderDirection: string;
    },
  ): Promise<ApiResponse<Exam>> {
    const response = await api.get(`/api/Teacher/Course/${courseId}/Exam`, {
      params: {
        Page: serviceData.page || 1,
        Size: serviceData.size || 10,
        Name: serviceData.name,
        OrderBy: serviceData.orderBy,
        OrderDirection: serviceData.orderDirection,
      },
    });

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    const result = {
      data: response.data.Data.map(mapToExam),
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };

    return result;
  }

  async getExamsForStudent(
    courseId: number,
    serviceData: {
      page?: number;
      size?: number;
      name?: string;
      orderBy: string;
      orderDirection: string;
    },
  ): Promise<ApiResponse<Exam>> {
    const response = await api.get(`/api/Student/Course/${courseId}/Exam`, {
      params: {
        Page: serviceData.page || 1,
        Size: serviceData.size || 10,
        Name: serviceData.name,
        OrderBy: serviceData.orderBy,
        OrderDirection: serviceData.orderDirection,
      },
    });

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    const result = {
      data: response.data.Data.map(mapToExam),
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };

    return result;
  }

  async getExam(courseId: number, examId: number): Promise<Exam> {
    const response = await api.get(
      `/api/Teacher/Course/${courseId}/Exam/${examId}`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return mapToExam(response.data.Data);
  }

  async getExamForStudent(courseId: number, examId: number): Promise<Exam> {
    const response = await api.get(
      `/api/Student/Course/${courseId}/Exam/${examId}`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return mapToExam(response.data.Data);
  }

  async createExam(courseId: number, data: CreateExamDto): Promise<boolean> {
    const body = {
      courseId: data.courseId,
      name: data.name,
      content: data.content,
      duration: data.duration,
      startDate: data.startDate,
      questions: data.questions?.map((question) => ({
        content: question.content,
        type: question.type,
        answers: question.answers.map((answer) => ({
          value: answer.value,
          isCorrect: answer.isCorrect,
        })),
      })),
    };

    const response = await api.post(
      `/api/Teacher/Course/${courseId}/Exam`,
      body,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return true;
  }

  async updateExam(
    courseId: number,
    examId: number,
    data: CreateExamDto,
  ): Promise<boolean> {
    // First check if exam can be edited
    const exam = await this.getExam(courseId, examId);
    if (exam.startDate >= new Date()) {
      throw new Error('Cannot edit an exam that has already started');
    }

    const body = {
      courseId: data.courseId,
      name: data.name,
      content: data.content,
      duration: data.duration,
      startDate: data.startDate,
      questions: data.questions?.map((question) => ({
        content: question.content,
        type: question.type,
        answers: question.answers.map((answer) => ({
          value: answer.value,
          isCorrect: answer.isCorrect,
        })),
      })),
    };

    const response = await api.put(
      `/api/Teacher/Course/${courseId}/Exam/${examId}`,
      body,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return true;
  }

  async deleteExam(courseId: number, examId: number): Promise<void> {
    // First check if exam can be deleted
    const exam = await this.getExam(courseId, examId);
    if (exam.startDate >= new Date()) {
      throw new Error('Cannot delete an exam that has already started');
    }

    await api.delete(`/api/Teacher/Course/${courseId}/Exam/${examId}`);
  }

  async startExam(courseId: number, examId: number): Promise<ExamStartDto> {
    const response = await api.post(
      `/api/Student/Course/${courseId}/Exam/${examId}/Start`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return {
      submissionId: response.data.Data.SubmissionId,
      examId: response.data.Data.ExamId,
      startedAt: response.data.Data.StartedAt,
      duration: response.data.Data.Duration,
      questions: response.data.Data.Questions.map(mapToQuestion),
    };
  }

  async submitExam(
    courseId: number,
    data: ExamSubmitDto,
  ): Promise<{
    score: number;
    submissionId: number;
    submittedAt: Date;
  }> {
    const response = await api.post(
      `/api/Student/Course/${courseId}/Exam/${data.examId}/Submit`,
      {
        examSubmissionId: data.submissionId,
        submissionTime: data.submittedAt,
        studentAnswers: data.answers.map((answer) => ({
          examQuestionId: answer.questionId,
          value: answer.value,
        })),
      },
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return {
      score: response.data.Data.Score,
      submissionId: response.data.Data.SubmissionId,
      submittedAt: response.data.Data.SubmittedAt,
    };
  }

  async getExamSubmissions(
    courseId: number,
    examId: number,
    role: string,
  ): Promise<ExamSubmission[]> {
    const response = await api.get(
      `/api/${role}/Course/${courseId}/Exam/${examId}/Submissions`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data.map(mapFromExamSubmissionResponseToSubmission);
  }

  async getExamSubmission(
    courseId: number,
    examId: number,
    submissionId: number,
    role: string,
  ): Promise<ExamSubmission> {
    const response = await api.get(
      `/api/${role}/Course/${courseId}/Exam/${examId}/Submissions/${submissionId}`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return mapFromExamSubmissionResponseToSubmission(response.data.Data);
  }
}

// Mapping functions
export const mapToExam = (response: ExamResponse): Exam => ({
  examId: response.ExamId,
  courseId: response.CourseId,
  name: response.Name,
  content: response.Content,
  duration: response.Duration,
  startDate: response.StartDate,
  endDate: response.EndDate,
  createdAt: response.CreatedAt,
  updatedAt: response.UpdatedAt,
  questions: response.Questions?.map(mapToQuestion),
  numberOfSubmissions: response.NumberOfSubmissions,
});

export const mapToQuestion = (response: ExamQuestionResponse) => ({
  questionId: response.ExamQuestionId ?? response.QuestionId,
  examId: response.ExamId,
  content: response.Content,
  answers: response.Answers?.map(mapToAnswer),
  type: response.Type,
});

export const mapToAnswer = (response: ExamAnswerResponse) => ({
  answerId: response.ExamAnswerId ?? response.AnswerId,
  questionId: response.ExamQuestionId,
  value: response.Value,
  isCorrect: response.IsCorrect,
});

export const mapFromExamSubmissionResponseToSubmission = (
  response: ExamSubmissionDto,
): ExamSubmission => ({
  submissionId: response.SubmissionId,
  examId: response.ExamId,
  studentId: response.StudentId,
  studentName: response.StudentName,
  score: response.Score,
  startedAt: response.StartedAt ? new Date(response.StartedAt) : undefined,
  submittedAt: response.SubmittedAt
    ? new Date(response.SubmittedAt)
    : undefined,
  status:
    response.Score !== null
      ? ExamSubmissionStatus.DONE
      : response.StartedAt
        ? ExamSubmissionStatus.IN_PROGRESS
        : ExamSubmissionStatus.NOT_STARTED,
  questions: response.Questions?.map(mapToQuestion),
});
