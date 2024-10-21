import React from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/common/ui/avatar';

interface ProfileProps {
  name: string;
  role: string;
}

const Profile: React.FC<ProfileProps> = ({ name, role }) => {
  return (
    <div className='flex items-center space-x-4 p-4'>
      <Avatar className='h-12 w-12 bg-gray-200'>
        <AvatarFallback>
          <User className='h-6 w-6 text-gray-600' />
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className='text-md font-semibold'>{name}</h2>
        <p className='text-gray-500'>{role}</p>
      </div>
    </div>
  );
};

export default Profile;
