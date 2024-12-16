import { useQuery } from '@tanstack/react-query';
import StudentService from '@/services/StudentService';
import TeacherService from '@/services/TeacherService';
import UserService from '@/services/UserService';
import { ProfileData } from '@/types/user';
import { Role } from '@/types/enums';

const fetchUserProfile = async (): Promise<ProfileData> => {
  const userService = new UserService();
  return await userService.getMe();
};

const fetchStudentProfile = async (id: string): Promise<ProfileData> => {
  const studentService = new StudentService();
  return studentService.getStudentById(id) as Promise<ProfileData>;
};

const fetchTeacherProfile = async (id: string): Promise<ProfileData> => {
  const teacherService = new TeacherService();
  const teacher = await teacherService.getTeacherById(id);
  return {
    id: teacher.id,
    fullname: teacher.fullname,
    role: Role.Teacher,
    email: teacher.contactEmail,
  };
};

const fetchProfileData = async (
  id: string,
  role: string,
): Promise<ProfileData> => {
  if (!id) {
    return fetchUserProfile();
  }

  switch (role) {
    case Role.Student:
      return fetchStudentProfile(id);
    case Role.Teacher:
      return fetchTeacherProfile(id);
    default:
      throw new Error('Invalid role');
  }
};

export const useProfileData = (id: string, role: string) => {
  return useQuery<ProfileData>({
    queryKey: ['profile', id, role],
    queryFn: () => fetchProfileData(id, role),
  });
};
