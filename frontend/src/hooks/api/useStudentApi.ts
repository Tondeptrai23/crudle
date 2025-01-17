import { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import StudentService from '@/services/StudentService';
import { UpcomingAssignment } from '@/types/assignment';
import { UpcomingExam } from '@/types/exam';
import { QueryHookParams } from '@/types/table';

const studentService = new StudentService();

export const useStudents = (data: QueryHookParams) => {
  let { page, pageSize, filters, sort } = data;
  const idFilter = (filters.id as string) ?? '';
  const nameFilter = (filters.fullname as string) ?? '';
  const dobRangeFilter = (filters.dob as Date[]) ?? [];

  if (page < 1) {
    page = 1;
  }

  return useQuery({
    queryKey: [
      'students',
      page,
      pageSize,
      idFilter,
      nameFilter,
      dobRangeFilter,
      sort,
    ],
    queryFn: () =>
      studentService.getStudentsByAdmin({
        page,
        size: pageSize,
        studentId: idFilter,
        fullname: nameFilter,
        dobFrom: dobRangeFilter[0]?.toDateString(),
        dobTo: dobRangeFilter[1]?.toDateString(),
        orderBy: sort.key ?? undefined,
        orderDirection: sort.direction ? 'desc' : 'asc',
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// Support one mutation at a time
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateStudentDTO) => {
      await studentService.addStudent(data);

      queryClient.invalidateQueries();
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  type UpdateStudentParams = { id: string; data: UpdateStudentDTO };

  return useMutation({
    mutationFn: async ({ id, data }: UpdateStudentParams) => {
      await studentService.updateStudent(id, data);

      queryClient.invalidateQueries();
    },
  });
};

export const useStudentDetail = (id: string) => {
  return useQuery({
    queryKey: ['studentDetail', id],
    queryFn: () => studentService.getStudentById(id),
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpcomingAssignments = (date: Date) => {
  return useQuery<UpcomingAssignment[], Error>({
    queryKey: ['upcomingAssignments', date],
    queryFn: async () => {
      return await studentService.getUpcomingAssignments(date);
    },
  });
};

export const useUpcomingExams = (date: Date) => {
  return useQuery<UpcomingExam[], Error>({
    queryKey: ['upcomingExams', date],
    queryFn: async () => {
      return await studentService.getUpcomingExams(date);
    },
  });
};

export const useNotReadArticles = () => {
  return useQuery({
    queryKey: ['notReadArticles'],
    queryFn: () => studentService.getNotReadArticles(),
  });
};

export const useNotSubmittedAssignments = () => {
  return useQuery({
    queryKey: ['notSubmittedAssignments'],
    queryFn: () => studentService.getNotSubmittedAssignments(),
  });
};

// export const useDeleteStudent = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       await studentService.deleteStudent(id);

//       queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
//       queryClient.invalidateQueries({ queryKey: studentKeys.detail(id) });
//     },
//   });
// };
