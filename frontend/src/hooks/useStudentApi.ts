import { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import MockStudentService from '@/services/mock/mockStudentService';

const studentKeys = {
  lists: () => ['students'],
  detail: (id: string) => ['student', id],
};

const studentService = new MockStudentService();

export const useStudents = (
  page: number,
  pageSize: number,
  search: string,
  filters: string[],
  rangeFilters: [number, number],
) => {
  return useQuery({
    queryKey: ['students', page, pageSize, search, filters, rangeFilters],
    queryFn: () =>
      studentService.getStudents(page, pageSize, search, filters, rangeFilters),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

// Support one mutation at a time
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateStudentDTO) => {
      await studentService.addStudent(data);

      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  type UpdateStudentParams = { id: string; data: UpdateStudentDTO };

  return useMutation({
    mutationFn: async ({ id, data }: UpdateStudentParams) => {
      await studentService.updateStudent(id, data);

      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: studentKeys.detail(id) });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await studentService.deleteStudent(id);

      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: studentKeys.detail(id) });
    },
  });
};
