// src/components/user/ProfileDetails.tsx
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { KeyRound, Mail } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card';

const ProfileDetail = ({ profileData }) => (
  <Card>
    <CardHeader>
      <CardTitle>About</CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      <div className='grid gap-4'>
        <div className='space-y-1'>
          <p className='text-sm font-medium'>Student ID</p>
          <p className='text-sm text-muted-foreground'>
            {profileData?.StudentId}
          </p>
        </div>

        <div className='space-y-1'>
          <p className='text-sm font-medium'>Email</p>
          <a
            href={`mailto:${profileData?.Email}`}
            className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary'
          >
            <Mail className='h-4 w-4' />
            {profileData?.Email}
          </a>
        </div>

        <div className='space-y-1'>
          <p className='text-sm font-medium'>Date of Birth</p>
          <p className='text-sm text-muted-foreground'>
            {profileData?.DateOfBirth &&
              format(new Date(profileData.DateOfBirth), 'PPP')}
          </p>
        </div>

        <div className='space-y-1'>
          <p className='text-sm font-medium'>Password</p>
          <Link
            to='/change-password'
            className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary'
          >
            <KeyRound className='h-4 w-4' />
            Change password
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ProfileDetail;
