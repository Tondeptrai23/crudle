import AssignmentService from '@/services/AssignmentService';
import { AssignmentSubmitDto, CreateAssignmentDto } from '@/types/assignment';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const assignmentService = new AssignmentService();

const assignmentKeys = {
  lists: () => ['assignments'],
  detail: (id: string) => ['assignments', id],
};

export const useAssignments = (courseId: number, role: string) => {
  const queryFn =
    role.toLowerCase() === 'teacher'
      ? () => assignmentService.getAssignmentsForTeacher(courseId)
      : () => assignmentService.getAssignmentsForStudent(courseId);

  return useQuery({
    queryKey: ['assignments'],
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useGetAssignment = (
  courseId: number,
  assignmentId: number,
  role: string,
) => {
  const queryFn =
    role.toLowerCase() === 'teacher'
      ? () => assignmentService.getAssignment(courseId, assignmentId)
      : () => assignmentService.getAssignmentForStudent(courseId, assignmentId);

  return useQuery({
    queryKey: assignmentKeys.detail(assignmentId.toString()),
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAssignmentDto) => {
      await assignmentService.createAssignment(data.courseId, data);

      queryClient.invalidateQueries({ queryKey: assignmentKeys.lists() });
    },
  });
};

export const useUpdateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      assignmentId: number;
      assignment: CreateAssignmentDto;
    }) => {
      await assignmentService.updateAssignment(
        data.assignment.courseId,
        data.assignmentId,
        data.assignment,
      );

      queryClient.invalidateQueries({ queryKey: assignmentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.detail(data.assignmentId.toString()),
      });
    },
  });
};

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { courseId: number; assignmentId: number }) => {
      await assignmentService.deleteAssignment(
        data.courseId,
        data.assignmentId,
      );

      queryClient.invalidateQueries({ queryKey: assignmentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: assignmentKeys.detail(data.assignmentId.toString()),
      });
    },
  });
};

export const useStartAssignment = (courseId: number, assignmentId: number) => {
  return useQuery({
    queryKey: ['startAssignment', courseId, assignmentId],
    queryFn: () => assignmentService.startAssignment(courseId, assignmentId),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      courseId: number;
      request: AssignmentSubmitDto;
    }) => {
      await assignmentService.submitAssignment(data.courseId, data.request);

      queryClient.invalidateQueries({
        queryKey: ['startAssignment', data.courseId, data.request.assignmentId],
      });
    },
  });
};
