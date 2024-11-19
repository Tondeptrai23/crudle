import Nav from '@/components/nav/Nav.tsx';
import { LucideLogOut, Settings, User } from 'lucide-react';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Nav
        className='max-h-18 max-w-full'
        items={[
          { label: 'Weather', path: '/' },
          { label: 'Course', path: '/course' },
        ]}
        handleNotification={() => {
          console.log('Notification clicked');
        }}
        profileItems={[
          {
            label: 'Profile',
            path: '/profile',
            icon: <User />,
          },
          {
            label: 'Settings',
            path: '/settings',
            icon: <Settings />,
          },
          {
            label: 'Logout',
            path: '/logout',
            icon: <LucideLogOut />,
          },
        ]}
      />
      <main className='flex-grow'>{children}</main>
    </>
  );
};

export default MainLayout;
