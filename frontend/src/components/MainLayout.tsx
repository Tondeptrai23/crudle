import Nav from '@/components/nav/Nav.tsx';
import { useRole } from '@/hooks/useAuth';
import { LucideLogOut, Settings, User } from 'lucide-react';
import React from 'react';
import { Separator } from './common/ui/separator';
import { getNavItems } from './nav/config';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const role = useRole();
  return (
    <>
      <Nav
        className='max-h-18 max-w-full'
        items={getNavItems(role)}
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

      <Separator />

      <main className='m-4 flex-grow'>{children}</main>
    </>
  );
};

export default MainLayout;
