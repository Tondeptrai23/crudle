import CourseService from '@/services/CourseService';
import { CreateCourseDTO } from '@/types/course';
import { QueryHookParams } from '@/types/table';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const courseService = new CourseService();

const courseKeys = {
  lists: () => ['courses'],
  detail: (id: string) => ['courses', id],
  articles: (courseId: string) => ['courses', courseId, 'articles'],
};

export const useCourses = (data: QueryHookParams) => {
  let { page, pageSize, filters, sort } = data;
  const nameFilter = filters.name as string;
  const codeFilter = filters.code as string[];
  const startDateFilter = filters.startDate as Date[];

  if (page < 1) {
    page = 1;
  }

  return useQuery({
    queryKey: [
      'courses',
      page,
      pageSize,
      nameFilter,
      codeFilter,
      startDateFilter,
      sort,
    ],
    queryFn: () =>
      courseService.getCoursesByAdmin({
        page,
        size: pageSize,
        name: nameFilter,
        code: codeFilter,
        startDateFrom: startDateFilter?.[0]?.toDateString(),
        startDateTo: startDateFilter?.[1]?.toDateString(),
        orderBy: sort.key ?? undefined,
        orderDirection: sort.direction || 'asc',
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourseDTO) => {
      await courseService.createCourse(data);

      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  type UpdateCourseParams = { id: string; data: any };

  return useMutation({
    mutationFn: async ({ id, data }: UpdateCourseParams) => {
      await courseService.updateCourse(id, data);

      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(id) });
    },
  });
};

export const useStudentCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getCoursesByStudent,
  });
};

export const useRoleBasedCourses = (role: string) => {
  const queryFn =
    role === 'Student'
      ? courseService.getCoursesByStudent
      : courseService.getCoursesByTeacher;
  return useQuery({
    queryKey: ['courses'],
    queryFn,
  });
};
