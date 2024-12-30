import TeacherService from '@/services/TeacherService';
import { UpcomingAssignment } from '@/types/assignment';
import { QueryHookParams } from '@/types/table';
import { CreateTeacherDTO, UpdateTeacherDTO } from '@/types/teacher';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const teacherKeys = {
  lists: () => ['teachers'],
  detail: (id: string) => ['teacher', id],
};

const teacherService = new TeacherService();

export const useTeachers = (data: QueryHookParams) => {
  let { page, pageSize, filters, sort } = data;
  const idFilter = filters.id as string;
  const nameFilter = filters.fullname as string;
  const emailDomainFilter = filters.contactEmail as string[];
  const phoneFilter = filters.phone as string;

  if (page < 1) {
    page = 1;
  }
  return useQuery({
    queryKey: [
      'teachers',
      page,
      pageSize,
      idFilter,
      nameFilter,
      emailDomainFilter,
      phoneFilter,
      sort,
    ],
    queryFn: () =>
      teacherService.getTeachersByAdmin({
        page,
        size: pageSize,
        teacherId: idFilter,
        fullname: nameFilter,
        contactEmailDomain: emailDomainFilter,
        contactPhone: phoneFilter,
        orderBy: sort.key ?? undefined,
        orderDirection: sort.direction ? 'desc' : 'asc',
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: false,
    refetchOnWindowFocus: false,
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

export const useUpcomingAssignments = (date: Date) => {
  return useQuery<UpcomingAssignment[], Error>({
    queryKey: ['upcomingAssignments', date],
    queryFn: async () => {
      return await teacherService.getUpcomingAssignments(date);
    },
  });
};

// export const useDeleteTeacher = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       await teacherService.deleteTeacher(id);
//       queryClient.invalidateQueries({ queryKey: teacherKeys.lists() });
//       queryClient.invalidateQueries({ queryKey: teacherKeys.detail(id) });
//     },
//   });
// };
