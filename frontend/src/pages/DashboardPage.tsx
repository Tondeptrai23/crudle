import useAuth from '@/hooks/useAuth';
import { Role } from '@/types/enums';
import { StudentDashboardPage } from './StudentDashboardPage';
import { TeacherDashboardPage } from './TeacherDashboardPage';

export const DashboardPage = () => {
  const { role } = useAuth();

  return role === Role.Student ? (
    <StudentDashboardPage />
  ) : (
    <TeacherDashboardPage />
  );
};
