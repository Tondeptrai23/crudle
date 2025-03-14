import {
  NavigationMenu,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
} from '@/components/common/ui/navigation-menu';
import { useProfileData } from '@/hooks/api/useProfileApi';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
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
  const { role } = useAuth();
  const { data } = useProfileData('', role);

  const generateNavigationItem = (path: string, label: string) => {
    const baseClass = 'px-3 py-1 font-semibold cursor-pointer';
    const selectedClass = 'bg-blue-500 rounded-lg text-white';

    const isSelected = pathname.search(path) !== -1;

    const classValue = `${baseClass} ${isSelected ? selectedClass : ''}`.trim();

    return (
      <NavigationMenuItem key={path}>
        {/* This <NavigationMenuLink> component is actually a <a> tag with some styles.
        When we work with React Router, we should use the <Link> component from the 'react-router-dom' library.

        <NavigationMenuLink href={path}>
          <div className={classValue}>{label}</div>
        </NavigationMenuLink> */}
        <Link to={path} replace>
          <div className={classValue}>{label}</div>
        </Link>
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
        <Profile
          name={data?.fullname ?? 'Admin'}
          role={role}
          items={props.profileItems}
        />
      </div>
    </NavigationMenu>
  );
};

export default Nav;
