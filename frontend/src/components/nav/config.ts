import { useLocation } from 'react-router-dom';

export function getNavItems(role?: string): { label: string; path: string }[] {
  let { pathname } = useLocation();
  pathname = pathname.toLowerCase();

  if (role === 'Admin' || pathname.includes('admin')) {
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
