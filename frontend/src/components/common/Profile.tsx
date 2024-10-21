import React from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/common/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';

interface ProfileProps {
  name: string;
  role: string;
}

const Profile: React.FC<ProfileProps> = ({ name, role }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className='flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg'>
          <Avatar className='h-12 w-12 bg-gray-200'>
            <AvatarFallback>
              <User className='h-6 w-6 text-gray-600' />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <h2 className='text-md font-semibold'>{name}</h2>
            <p className='text-gray-500'>{role}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 -mt-4" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;