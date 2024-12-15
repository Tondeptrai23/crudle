import Assignment, {
  AssignmentResponse,
  CreateAssignmentDto,
} from '@/types/assignment';
import api from '@/utils/api';

export default class AssignmentService {
  async getAssignmentsForTeacher(courseId: number): Promise<Assignment[]> {
    const response = await api.get(
      `/api/Teacher/Course/${courseId}/Assignment`,
    );

    if (!response.data.Success) {
      throw new Error(response.data.Message);
    }

    return response.data.Data.map(mapToAssignment);
  }

  async createAssignment(
    courseId: number,
    data: CreateAssignmentDto,
  ): Promise<Assignment> {
    const response = await api.post(
      `/api/Teacher/Course/${courseId}/Assignment`,
      data,
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
    const response = await api.put(
      `/api/Teacher/Course/${courseId}/Assignment/${assignmentId}`,
      data,
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
}

export const mapToAssignment = (response: AssignmentResponse) => ({
  assignmentId: response.AssignmentId,
  courseId: response.CourseId,
  name: response.Name,
  content: response.Content,
  duedAt: response.DuedAt,
  createdAt: response.CreatedAt,
  updatedAt: response.UpdatedAt,
  canViewScore: response.CanViewScore,
  canRetry: response.CanRetry,
  type: response.Type,
});
