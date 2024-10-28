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
import { LogOut, Settings, User } from 'lucide-react';
import React from 'react';

export interface ProfileProps {
  name: string;
  role: string;
  actions: ProfileActions;
}

export interface ProfileActions {
  handleProfile: () => void;
  handleSettings: () => void;
  handleLogout: () => void;
}

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <div className='flex items-center space-x-4 rounded-lg p-4 hover:bg-gray-100'>
          <Avatar className='h-12 w-12 bg-gray-200'>
            <AvatarFallback>
              <User className='h-6 w-6 text-gray-600' />
            </AvatarFallback>
          </Avatar>
          <div className='hidden md:block'>
            <h2 className='text-md font-semibold'>{props.name}</h2>
            <p className='text-gray-500'>{props.role}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='-mt-4 w-56' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            variant='ghost'
            className='h-6 p-0'
            onClick={props.actions.handleProfile}
          >
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            variant='ghost'
            className='h-6 p-0'
            onClick={props.actions.handleSettings}
          >
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            variant='ghost'
            className='h-6 p-0'
            onClick={props.actions.handleLogout}
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
