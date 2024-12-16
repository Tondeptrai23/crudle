import AssignmentService from '@/services/AssignmentService';
import { CreateAssignmentDto } from '@/types/assignment';
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

export const useAssignments = (courseId: number) => {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: () => assignmentService.getAssignmentsForTeacher(courseId),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useGetAssignment = (courseId: number, assignmentId: number) => {
  return useQuery({
    queryKey: assignmentKeys.detail(assignmentId.toString()),
    queryFn: () => assignmentService.getAssignment(courseId, assignmentId),
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
