import AssignmentService from '@/services/AssignmentService';
import { AssignmentSubmitDto, CreateAssignmentDto } from '@/types/assignment';
import { Role } from '@/types/enums';
import { QueryHookParams } from '@/types/table';
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

export const useAssignments = (
  courseId: number,
  role: string,
  data: QueryHookParams,
) => {
  const { page } = data;
  const { pageSize, filters, sort } = data;
  const nameFilter = filters.name as string;

  const serviceData = {
    page,
    size: pageSize,
    name: nameFilter,
    orderBy: sort.key || 'dueDate',
    orderDirection: sort.direction || 'asc',
  };

  const queryFn =
    role === Role.Teacher
      ? () => assignmentService.getAssignmentsForTeacher(courseId, serviceData)
      : () => assignmentService.getAssignmentsForStudent(courseId, serviceData);

  return useQuery({
    queryKey: ['assignments', courseId, serviceData],
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
    role === Role.Teacher
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
      assignmentId: string;
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

export const useResumeAssignment = (
  courseId: number,
  assignmentId: number,
  submissionId: number,
) => {
  return useQuery({
    queryKey: ['resumeAssignment', courseId, assignmentId, submissionId],
    queryFn: () =>
      assignmentService.resumeAssignment(courseId, assignmentId, submissionId),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useStartAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { courseId: number; assignmentId: number }) => {
      const response = await assignmentService.startAssignment(
        data.courseId,
        data.assignmentId,
      );

      queryClient.invalidateQueries({
        queryKey: ['startAssignment', data.courseId, data.assignmentId],
      });

      return response;
    },
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      courseId: number;
      request: AssignmentSubmitDto;
    }) => {
      const res = await assignmentService.submitAssignment(
        data.courseId,
        data.request,
      );

      queryClient.invalidateQueries({
        queryKey: ['startAssignment', data.courseId, data.request.assignmentId],
      });

      return res;
    },
  });
};

export const useLatestSubmissions = (courseId: string, assignmentId: string) => {
  return useQuery({
    queryKey: ['submissions', courseId, assignmentId],
    queryFn: () =>
      assignmentService.getLatestSubmissions(courseId, assignmentId),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useSubmission = (courseId: string, assignmentId: string, submissionId: string) => {
	return useQuery({
		queryKey: ['submission', courseId, assignmentId, submissionId],
		queryFn: () =>
			assignmentService.getSubmission(courseId, assignmentId, submissionId),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		retry: false,
	});
}