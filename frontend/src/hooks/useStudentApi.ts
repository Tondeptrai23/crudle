import { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import studentService from '@/services/mock/mockStudentService';

const studentKeys = {
  lists: () => ['students'],
  detail: (id: string) => ['student', id],
};

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: studentService.getStudents,
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
