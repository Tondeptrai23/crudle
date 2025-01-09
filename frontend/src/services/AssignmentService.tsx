import Assignment, {
  AssignmentStartDto,
  AssignmentSubmitDto,
  CreateAssignmentDto,
  mapToAssignment,
  mapToQuestion,
} from '@/types/assignment';
import { ApiResponse } from '@/types/paginationApiResponse';
import Submission, { mapToSubmission, SubmissionStatus, SubmissionWithStatus } from '@/types/submission';
import api from '@/utils/api';
import CourseService from '@/services/CourseService';

const courseService = new CourseService();

export default class AssignmentService {
  async getAssignmentsForTeacher(
    courseId: number,
    serviceData: {
      page?: number;
      size?: number;
      name?: string;
      orderBy: string;
      orderDirection: string;
    },
  ): Promise<ApiResponse<Assignment>> {
    const response = await api.get(
      `/api/Teacher/Course/${courseId}/Assignment`,
      {
        params: {
          Page: serviceData.page,
          Size: serviceData.size,
          Name: serviceData.name,
          OrderBy: serviceData.orderBy,
          OrderDirection: serviceData.orderDirection,
        },
      },
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    const result = {
      data: response.data.Data.map(mapToAssignment),
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };

    return result;
  }

  async getAssignmentsForStudent(
    courseId: number,
    serviceData: {
      page?: number;
      size?: number;
      name?: string;
      orderBy: string;
      orderDirection: string;
    },
  ): Promise<ApiResponse<Assignment>> {
    const response = await api.get(
      `/api/Student/Course/${courseId}/Assignment`,
      {
        params: {
          Page: serviceData.page,
          Size: serviceData.size,
          Name: serviceData.name,
          OrderBy: serviceData.orderBy,
          OrderDirection: serviceData.orderDirection,
        },
      },
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    const result = {
      data: response.data.Data.map(mapToAssignment),
      totalItems: response.data.TotalItems,
      totalPages: response.data.TotalPages,
      currentPage: response.data.CurrentPage,
    };

    return result;
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
  ): Promise<{
    score: number;
    submissionId: number;
    submittedAt: Date;
  }> {
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

    return {
      score: response.data.Data.Score,
      submissionId: response.data.Data.SubmissionId,
      submittedAt: response.data.Data.SubmittedAt,
    };
  }

  async resumeAssignment(
    courseId: number,
    assignmentId: number,
    submissionId: number,
  ): Promise<AssignmentStartDto> {
    const response = await api.get(
      `/api/Student/Course/${courseId}/Assignment/${assignmentId}/Resume/${submissionId}`,
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

	async getSubmissions(courseId: string, assignmentId: string): Promise<SubmissionWithStatus[]> {
		const [response, course] = await Promise.all([
			api.get(`/api/Teacher/Course/${courseId}/Assignment/${assignmentId}/Submissions?OrderBy=SubmittedAt&OrderDirection=desc`),
			courseService.getCourse('Teacher', courseId)
		]);

		if (!response.data.Success) {
			throw new Error(response.data.Message);
		}

		const students = course.students ?? [];
		const submissions = response.data.Data.map(mapToSubmission);
		const submissionsWithStatus: SubmissionWithStatus[] = [];

		submissions.forEach((submission : Submission) => {
			const possibleIndex = submissionsWithStatus.findIndex(
				(submissionWithStatus) => submissionWithStatus.studentId === submission.studentId
			);
			const status = submission.score === null 
				? SubmissionStatus.IN_PROGRESS 
				: SubmissionStatus.DONE;

			if (possibleIndex === -1) {
				submissionsWithStatus.push({ ...submission, status });
			} else if (submissionsWithStatus[possibleIndex].status === SubmissionStatus.IN_PROGRESS && status === SubmissionStatus.DONE) {
				submissionsWithStatus[possibleIndex] = { ...submission, status };
			}
		});

		students.forEach((student) => {
			if (!submissionsWithStatus.find((submission) => submission.studentId === student.id)) {
				submissionsWithStatus.push({
					studentId: student.id,
					studentName: student.fullname,
					status: SubmissionStatus.NOT_STARTED,
				});
			}
		});

		return submissionsWithStatus;
	}
}