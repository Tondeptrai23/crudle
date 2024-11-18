import { Role } from '@/types/enums';
import { getRole } from '@/utils/api';
import { useLocation } from 'react-router-dom';

export function getNavItems(): { label: string; path: string }[] {
  let { pathname } = useLocation();
  pathname = pathname.toLowerCase();

  const role = getRole();

  if (role === Role.Admin) {
    return [
      { label: 'Home', path: '/admin' },
      { label: 'Course', path: '/admin/course' },
      { label: 'Teacher', path: '/admin/teacher' },
      { label: 'Student', path: '/admin/student' },
    ];
  } else {
    return [
      { label: 'Weather', path: '/' },
      { label: 'Course', path: '/course' },
    ];
  }
}
