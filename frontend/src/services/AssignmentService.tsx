import Assignment, {
  AnswerResponse,
  AssignmentResponse,
  AssignmentStartDto,
  AssignmentSubmitDto,
  CreateAssignmentDto,
  QuestionResponse,
} from '@/types/assignment';
import api from '@/utils/api';

export default class AssignmentService {
  async getAssignmentsForTeacher(courseId: number): Promise<Assignment[]> {
    const response = await api.get(
      `/api/Teacher/Course/${courseId}/Assignment?size=200`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data.map(mapToAssignment);
  }

  async getAssignmentsForStudent(courseId: number): Promise<Assignment[]> {
    const response = await api.get(
      `/api/Student/Course/${courseId}/Assignment?size=200`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data.map(mapToAssignment);
  }

  async getAssignment(
    courseId: number,
    assignmentId: number,
  ): Promise<Assignment> {
    const response = await api.get(
      `/api/Teacher/Course/${courseId}/Assignment/${assignmentId}`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return mapToAssignment(response.data.Data);
  }

  async getAssignmentForStudent(
    courseId: number,
    assignmentId: number,
  ): Promise<Assignment> {
    const response = await api.get(
      `/api/Student/Course/${courseId}/Assignment/${assignmentId}`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return mapToAssignment(response.data.Data);
  }

  async createAssignment(
    courseId: number,
    data: CreateAssignmentDto,
  ): Promise<Assignment> {
    // Remove all ids from the data except for the courseId
    const body = {
      courseId: data.courseId,
      name: data.name,
      content: data.content,
      dueDate: data.dueDate,
      canViewScore: data.canViewScore,
      canRetry: data.canRetry,
      type: data.type,
      questions: data.questions?.map((question) => ({
        content: question.content,
        answers: question.answers.map((answer) => ({
          value: answer.value,
          isCorrect: answer.isCorrect,
        })),
        type: question.type,
      })),
    };

    const response = await api.post(
      `/api/Teacher/Course/${courseId}/Assignment`,
      body,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  }

  async updateAssignment(
    courseId: number,
    assignmentId: number,
    data: CreateAssignmentDto,
  ): Promise<Assignment> {
    const body = {
      courseId: data.courseId,
      name: data.name,
      content: data.content,
      dueDate: data.dueDate,
      canViewScore: data.canViewScore,
      canRetry: data.canRetry,
      type: data.type,
      questions: data.questions?.map((question) => ({
        content: question.content,
        answers: question.answers.map((answer) => ({
          value: answer.value,
          isCorrect: answer.isCorrect,
        })),
        type: question.type,
      })),
    };

    const response = await api.put(
      `/api/Teacher/Course/${courseId}/Assignment/${assignmentId}`,
      body,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data;
  }

  async deleteAssignment(
    courseId: number,
    assignmentId: number,
  ): Promise<void> {
    await api.delete(
      `/api/Teacher/Course/${courseId}/Assignment/${assignmentId}`,
    );
  }

  async startAssignment(
    courseId: number,
    assignmentId: number,
  ): Promise<AssignmentStartDto> {
    const response = await api.post(
      `/api/Student/Course/${courseId}/Assignment/${assignmentId}/Start`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return {
      submissionId: response.data.Data.SubmissionId,
      assignmentId: response.data.Data.AssignmentId,
      startedAt: response.data.Data.StartedAt,
      questions: response.data.Data.Questions.map(mapToQuestion),
    };
  }

  async submitAssignment(
    courseId: number,
    data: AssignmentSubmitDto,
  ): Promise<void> {
    const response = await api.post(
      `/api/Student/Course/${courseId}/Assignment/${data.assignmentId}/Submit`,
      {
        submissionId: data.submissionId,
        answers: data.answers.map((answer) => ({
          questionId: answer.questionId,
          value: answer.value,
        })),
      },
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    console.log('Submit response:', response.data.Data);

    return response.data.Data;
  }
}

export const mapToAssignment = (response: AssignmentResponse) => ({
  assignmentId: response.AssignmentId,
  courseId: response.CourseId,
  name: response.Name,
  content: response.Content,
  dueDate: response.DueDate,
  createdAt: response.CreatedAt,
  updatedAt: response.UpdatedAt,
  canViewScore: response.CanViewScore,
  canRetry: response.CanRetry,
  type: response.Type,
  questions: response.Questions?.map(mapToQuestion),
});

export const mapToQuestion = (response: QuestionResponse) => ({
  questionId: response.QuestionId,
  assignmentId: response.AssignmentId,
  content: response.Content,
  answers: response.Answers?.map(mapToAnswer),
  type: response.Type,
});

export const mapToAnswer = (response: AnswerResponse) => ({
  answerId: response.AnswerId,
  questionId: response.QuestionId,
  value: response.Value,
  isCorrect: response.IsCorrect,
});
