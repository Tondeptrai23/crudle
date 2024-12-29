import { Role } from '@/types/enums';
import { getRole } from '@/utils/api';
import { useLocation } from 'react-router-dom';

export function getNavItems(): { label: string; path: string }[] {
  let { pathname } = useLocation();
  pathname = pathname.toLowerCase();

  const role = getRole();

  if (role === Role.Admin) {
    return [
      { label: 'Home', path: '/admin/dashboard' },
      { label: 'Course', path: '/admin/course' },
      { label: 'Teacher', path: '/admin/teacher' },
      { label: 'Student', path: '/admin/student' },
    ];
  } else {
    return [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Course', path: '/course' },
    ];
  }
}

export function getDefaultPath(): string {
  const role = getRole();

  if (role === Role.Admin) {
    return '/admin/dashboard';
  } else {
    return '/dashboard';
  }
}
