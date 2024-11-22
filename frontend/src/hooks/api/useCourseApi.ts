import CourseService from '@/services/CourseService';
import { QueryHookParams } from '@/types/table';
import { useQuery } from '@tanstack/react-query';

const courseService = new CourseService();

export const useCourses = (data: QueryHookParams) => {
  const { page, pageSize, filters, sort } = data;
  const nameFilter = filters.name as string;
  const codeFilter = filters.code as string[];
  const startDateFilter = filters.startDate as Date[];

  return useQuery({
    queryKey: ['courses', page, pageSize, codeFilter, startDateFilter, sort],
    queryFn: () =>
      courseService.getCoursesByAdmin({
        page,
        size: pageSize,
        name: nameFilter,
        code: codeFilter,
        startDateFrom: startDateFilter?.[0]?.toISOString(),
        startDateTo: startDateFilter?.[1]?.toISOString(),
        orderBy: sort.key ?? undefined,
        orderDirection: sort.direction || 'asc',
      }),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
