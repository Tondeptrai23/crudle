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

const ProfileDetail = ({ profileData, role, selfViewed }) => (
  <Card>
    <CardHeader>
      <CardTitle>About</CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      <div className='grid gap-4'>
        <div className='space-y-1'>
          <p className='text-sm font-medium'>{role} ID</p>
          <p className='text-sm text-muted-foreground'>{profileData.id}</p>
        </div>

        <div className='space-y-1'>
          <p className='text-sm font-medium'>Email</p>
          <a
            href={`mailto:${profileData?.email}`}
            className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary'
          >
            <Mail className='h-4 w-4' />
            {profileData?.email}
          </a>
        </div>

        {profileData?.dob && (
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Date of Birth</p>
            <p className='text-sm text-muted-foreground'>
              {format(new Date(profileData.dob), 'PPP')}
            </p>
          </div>
        )}

        {selfViewed && (
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
        )}
      </div>
    </CardContent>
  </Card>
);

export default ProfileDetail;
