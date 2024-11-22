import { ApiResponse } from '@/types/paginationApiResponse';
import Teacher from '@/types/teacher';

export default interface ITeacherService {
  getTeachers: (
    page: number,
    pageSize: number,
    search: string,
  ) => Promise<ApiResponse<Teacher>>;
}
