import MockTeacherService from '@/services/mock/mockTeacherService';
import { CreateTeacherDTO, UpdateTeacherDTO } from '@/types/teacher';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const teacherKeys = {
  lists: () => ['teachers'],
  detail: (id: string) => ['teacher', id],
};

const teacherService = new MockTeacherService();

export const useTeachers = (page: number, pageSize: number, search: string) => {
  return useQuery({
    queryKey: ['teachers', page, pageSize, search],
    queryFn: () => teacherService.getTeachers(page, pageSize, search),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTeacherDTO) => {
      await teacherService.addTeacher(data);
      queryClient.invalidateQueries({ queryKey: teacherKeys.lists() });
    },
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  type UpdateTeacherParams = { id: string; data: UpdateTeacherDTO };

  return useMutation({
    mutationFn: async ({ id, data }: UpdateTeacherParams) => {
      await teacherService.updateTeacher(id, data);
      queryClient.invalidateQueries({ queryKey: teacherKeys.lists() });
      queryClient.invalidateQueries({ queryKey: teacherKeys.detail(id) });
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await teacherService.deleteTeacher(id);
      queryClient.invalidateQueries({ queryKey: teacherKeys.lists() });
      queryClient.invalidateQueries({ queryKey: teacherKeys.detail(id) });
    },
  });
};
