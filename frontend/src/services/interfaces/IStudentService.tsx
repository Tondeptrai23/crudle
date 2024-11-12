import { ApiResponse } from '@/types/paginationApiResponse';
import Student from '@/types/student';

export default interface IStudentService {
  getStudents: (
    page: number,
    pageSize: number,
    search: string,
    filters: string[],
    rangeFilters: [number, number],
  ) => Promise<ApiResponse<Student>>;
}
