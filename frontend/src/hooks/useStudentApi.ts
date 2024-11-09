import { useQuery } from 'react-query';

import studentService from '@/services/mock/mockStudentService';

export default function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: studentService.getStudents,
  });
}
