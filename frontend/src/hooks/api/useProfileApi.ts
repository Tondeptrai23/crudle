import { useQuery } from '@tanstack/react-query';
import StudentService from '@/services/StudentService';
import TeacherService from '@/services/TeacherService';
import UserService from '@/services/UserService';
import { ProfileData } from '@/types/user';

export const useProfileData = (id: string, role: string) => {
  return useQuery<ProfileData>({
    queryKey: ['profile', id, role],
    queryFn: async () => {
      if (!id) {
        const userService = new UserService();
        console.log(await userService.getMe());
        return await userService.getMe();
      }

      switch (role) {
        case 'Student': {
          const studentService = new StudentService();
          return studentService.getStudentById(id) as Promise<ProfileData>;
        }
        case 'Teacher': {
          const teacherService = new TeacherService();
          const teacher = await teacherService.getTeacherById(id);
          return {
            id: teacher.id,
            fullname: teacher.fullname,
            role: 'Teacher',
            email: teacher.contactEmail,
          };
        }
        default:
          throw new Error('Invalid role');
      }
    },
  });
};
