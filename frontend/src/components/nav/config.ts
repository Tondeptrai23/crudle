import { useLocation } from 'react-router-dom';

export function getNavItems(role?: string): { label: string; path: string }[] {
  // This is temporary, we will replace this with a real role check
  let { pathname } = useLocation();
  pathname = pathname.toLowerCase();

  if (role === 'admin' || pathname.includes('admin')) {
    return [
      { label: 'Dashboard', path: '/admin/dashboard' },
      { label: 'Course', path: '/admin/course' },
      { label: 'Teacher', path: '/admin/teacher' },
      { label: 'Student', path: '/admin/student' },
      { label: 'Student Test', path: '/admin/test/student' },
    ];
  } else {
    return [
      { label: 'Weather', path: '/' },
      { label: 'Course', path: '/course' },
      { label: 'Admin', path: '/admin/dashboard' },
    ];
  }
}
