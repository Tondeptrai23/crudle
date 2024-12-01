import useAuth from '@/hooks/useAuth';
import { Role } from '@/types/enums';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({
  children,
  allowedRoles = [Role.User],
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) {
  const { authed, role } = useAuth();
  const location = useLocation();

  if (allowedRoles.includes(Role.User)) {
    allowedRoles = [Role.Admin, Role.Teacher, Role.Student];
  }

  return authed === true && allowedRoles.includes(role) ? (
    children
  ) : (
    <Navigate to='/login' replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
