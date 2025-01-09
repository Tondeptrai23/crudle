// hooks/api/useExamApi.ts

import ExamService from '@/services/ExamService';
import { Role } from '@/types/enums';
import { CreateExamDto, Exam, ExamSubmitDto } from '@/types/exam';
import { QueryHookParams } from '@/types/table';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const examService = new ExamService();

const examKeys = {
  lists: () => ['exams'],
  detail: (id: string) => ['exams', id],
  submission: (examId: string, submissionId: string) => [
    'exams',
    examId,
    'submissions',
    submissionId,
  ],
};

export const useExams = (
  courseId: number,
  role: string,
  data: QueryHookParams,
) => {
  const { page, pageSize, filters, sort } = data;
  const nameFilter = filters.name as string;

  const serviceData = {
    page,
    size: pageSize,
    name: nameFilter,
    orderBy: sort.key || 'startDate',
    orderDirection: sort.direction || 'asc',
  };

  const queryFn =
    role === Role.Teacher
      ? () => examService.getExamsForTeacher(courseId, serviceData)
      : () => examService.getExamsForStudent(courseId, serviceData);

  return useQuery({
    queryKey: ['exams', courseId, serviceData],
    queryFn,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useGetExam = (courseId: number, examId: number, role: string) => {
  const queryFn =
    role === Role.Teacher
      ? () => examService.getExam(courseId, examId)
      : () => examService.getExamForStudent(courseId, examId);

  return useQuery({
    queryKey: examKeys.detail(examId.toString()),
    queryFn,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateExamDto) => {
      await examService.createExam(data.courseId, data);
      queryClient.invalidateQueries({ queryKey: examKeys.lists() });
    },
  });
};

export const useUpdateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { examId: number; exam: CreateExamDto }) => {
      try {
        await examService.updateExam(
          data.exam.courseId,
          data.examId,
          data.exam,
        );

        queryClient.invalidateQueries({ queryKey: examKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: examKeys.detail(data.examId.toString()),
        });
      } catch (error) {
        // Re-throw the error to be handled by the UI
        throw error;
      }
    },
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { courseId: number; examId: number }) => {
      try {
        await examService.deleteExam(data.courseId, data.examId);

        queryClient.invalidateQueries({ queryKey: examKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: examKeys.detail(data.examId.toString()),
        });
      } catch (error) {
        // Re-throw the error to be handled by the UI
        throw error;
      }
    },
  });
};

export const useStartExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { courseId: number; examId: number }) => {
      const response = await examService.startExam(data.courseId, data.examId);

      queryClient.invalidateQueries({
        queryKey: ['startExam', data.courseId, data.examId],
      });

      return response;
    },
  });
};

export const useSubmitExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { courseId: number; request: ExamSubmitDto }) => {
      const res = await examService.submitExam(data.courseId, data.request);

      // Invalidate both the exam and its submission queries
      queryClient.invalidateQueries({
        queryKey: examKeys.detail(data.request.examId.toString()),
      });
      queryClient.invalidateQueries({
        queryKey: examKeys.submission(
          data.request.examId.toString(),
          data.request.submissionId.toString(),
        ),
      });

      return res;
    },
  });
};

export const useCanModifyExam = (exam: Exam | undefined) => {
  if (!exam) return false;

  const now = new Date();
  const startDate = new Date(exam.startDate);
  const endDate = new Date(startDate.getTime() + exam.duration * 60 * 1000);

  return now < startDate;
};
