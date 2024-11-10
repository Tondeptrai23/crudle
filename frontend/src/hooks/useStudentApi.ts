import { CreateStudentDTO } from '@/types/student';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import studentService from '@/services/mock/mockStudentService';

const studentKeys = {
  lists: () => ['students'],
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
      const newStudent = await studentService.addStudent(data);

      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      return newStudent;
    },
  });
};
