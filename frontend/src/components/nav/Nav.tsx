import { Button } from '@/components/common/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/common/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import Profile, { ProfileMenuItem } from './Profile';

export interface NavProps {
  className?: string;
  items: { path: string; label: string }[];
  handleNotification: () => void;
  profileItems: ProfileMenuItem[];
}

const Nav: React.FC<NavProps> = (props) => {
  const { pathname } = useLocation();

  const generateNavigationItem = (path: string, label: string) => {
    const baseClass = 'px-3 py-1 font-semibold cursor-pointer';
    const selectedClass = 'bg-blue-500 rounded-lg text-white';

    const isSelected =
      (path === '/' && pathname === '/') ||
      (path !== '/' && pathname.startsWith(path));

    const classValue = `${baseClass} ${isSelected ? selectedClass : ''}`.trim();

    return (
      <NavigationMenuItem key={path}>
        <NavigationMenuLink href={path}>
          <div className={classValue}>{label}</div>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <NavigationMenu
      className={cn('flex justify-between px-8', props.className)}
      orientation='horizontal'
    >
      <div className='flex items-center gap-8'>
        <Logo />
        <NavigationMenuList className='gap-4'>
          {props.items.map(({ path, label }) =>
            generateNavigationItem(path, label),
          )}
        </NavigationMenuList>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          onClick={props.handleNotification}
        >
          <Bell />
        </Button>
        <Profile name='John Doe' role='Hoc Sinh' items={props.profileItems} />
      </div>
    </NavigationMenu>
  );
};

export default Nav;