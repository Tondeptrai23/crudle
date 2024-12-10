import { useQuery } from '@tanstack/react-query';
import StudentService from '@/services/StudentService';
import TeacherService from '@/services/TeacherService';
import UserService from '@/services/UserService';
import { ProfileData } from '@/types/user';
import { Role } from '@/types/enums';

export const useProfileData = (id: string, role: string) => {
  return useQuery<ProfileData>({
    queryKey: ['profile', id, role],
    queryFn: async () => {
      if (!id) {
        const userService = new UserService();
        return await userService.getMe();
      }

      switch (role) {
        case Role.Student: {
          const studentService = new StudentService();
          return studentService.getStudentById(id) as Promise<ProfileData>;
        }
        case Role.Teacher: {
          const teacherService = new TeacherService();
          const teacher = await teacherService.getTeacherById(id);
          return {
            id: teacher.id,
            fullname: teacher.fullname,
            role: Role.Teacher,
            email: teacher.contactEmail,
          };
        }
        default:
          throw new Error('Invalid role');
      }
    },
  });
};
