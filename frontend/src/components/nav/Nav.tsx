import { Button } from '@/components/common/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
} from '@/components/common/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    const selectedClass = 'bg-zinc-200 rounded-lg';

    const isSelected =
      (path === '/' && pathname === '/') ||
      (path !== '/' && pathname.startsWith(path));

    const classValue = `${baseClass} ${isSelected ? selectedClass : ''}`.trim();

    return (
      <NavigationMenuItem key={path}>
        {/* This <NavigationMenuLink> component is actually a <a> tag with some styles.
        When we work with React Router, we should use the <Link> component from the 'react-router-dom' library.

        <NavigationMenuLink href={path}>
          <div className={classValue}>{label}</div>
        </NavigationMenuLink> */}
        <Link to={path} replace><div className={classValue}>{label}</div></Link>
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
