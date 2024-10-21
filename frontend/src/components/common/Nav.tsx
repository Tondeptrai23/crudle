import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/common/ui/navigation-menu';
import Logo  from './Logo';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import Profile from './Profile';
import { useLocation } from 'react-router-dom';

interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const { pathname } = useLocation();

  const navigationItems = [
    { path: '/', text: 'General' },
    { path: '/course', text: 'Course' },
  ];

  const generateNavigationItem = (path: string, text: string) => {
    const baseClass = 'px-3 py-1 font-semibold cursor-pointer';
    const selectedClass = 'bg-zinc-200 rounded-lg';

    const isSelected =
      (path === '/' && pathname === '/') ||
      (path !== '/' && pathname.startsWith(path));

    const classValue = `${baseClass} ${isSelected ? selectedClass : ''}`.trim();

    return (
      <NavigationMenuItem key={path}>
        <NavigationMenuLink href={path}>
          <div className={classValue}>{text}</div>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <NavigationMenu
      className={cn('flex justify-between px-8', className)}
      orientation='horizontal'
    >
      <div className='flex items-center gap-4'>
        <Logo />
        <NavigationMenuList className='gap-4'>
          {navigationItems.map(({ path, text }) =>
            generateNavigationItem(path, text)
          )}
        </NavigationMenuList>
      </div>
      <div className='flex items-center gap-2'>
        <Bell />
        <Profile name='John Doe' role='Hoc Sinh' />
      </div>
    </NavigationMenu>
  );
};

export default Nav;
