import { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import MockStudentService from '@/services/mock/mockStudentService';
import { QueryHookParams } from '@/types/table';

const studentKeys = {
  lists: () => ['students'],
  detail: (id: string) => ['student', id],
};

const studentService = new MockStudentService();

export const useStudents = (data: {
  page: number;
  pageSize: number;
  search: string;
}) => {
  const { page, pageSize, search } = data;
  return useQuery({
    queryKey: ['students', page, pageSize, search],
    queryFn: () => studentService.getStudents(page, pageSize, search),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useStudentsWithFilters = (data: QueryHookParams) => {
  const { page, pageSize, search, filters, sort } = data;
  const emailDomainFilter = filters.email as string[];
  const dobRangeFilter = filters.dob as [number, number];

  return useQuery({
    queryKey: ['students', page, pageSize, search, filters, sort],
    queryFn: () =>
      studentService.getStudentsWithFilters(
        page,
        pageSize,
        search,
        emailDomainFilter,
        dobRangeFilter,
        [sort.key || '', sort.direction || 'asc'],
      ),
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
