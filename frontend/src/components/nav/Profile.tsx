import { Avatar, AvatarFallback } from '@/components/common/ui/avatar';
import { Button } from '@/components/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export interface ProfileProps {
  avatar?: React.ReactNode;
  name: string;
  role: string;
  items: ProfileMenuItem[];
}

export interface ProfileMenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const menuItems = props.items.map((item, index) => (
    <DropdownMenuItem key={index}>
      <Link to={item.path} className='flex w-full items-center'>
        <Button variant='ghost' className='h-6 p-0'>
          <div className='flex h-8 w-8 items-center'>{item.icon}</div>
          <span>{item.label}</span>
        </Button>
      </Link>
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <div className='flex items-center space-x-3 rounded-lg px-4 py-2 hover:bg-gray-100'>
          <Avatar className='h-12 w-12 bg-gray-200'>
            <AvatarFallback>
              {props.avatar ? props.avatar : <User />}
            </AvatarFallback>
          </Avatar>
          <div className='hidden text-left md:block'>
            <h2 className='text-md font-semibold'>{props.name}</h2>
            <p className='text-gray-500'>{props.role}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='-mt-2 w-56' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
