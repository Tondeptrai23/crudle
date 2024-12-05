// src/pages/ProfilePage.tsx
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import api from '@/utils/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card';
import { Avatar, AvatarFallback } from '@/components/common/ui/avatar';
import { Skeleton } from '@/components/common/ui/skeleton';
import { User, KeyRound, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStudentCourses } from '@/hooks/api/useCourseApi';

interface ProfileData {
  Email: string;
  StudentId: number;
  Fullname: string;
  DateOfBirth: string;
  UserId: string;
  Role: string;
}

const ProfilePage = () => {
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get<{ Success: boolean; Data: ProfileData }>(
        '/api/User/me',
      );
      return response.data.Data;
    },
  });

  const { data: coursesData, isLoading: isCoursesLoading } =
    useStudentCourses();

  if (isProfileLoading) {
    return (
      <div className='container mx-auto max-w-6xl p-8'>
        <div className='grid grid-cols-[300px_1fr] gap-8'>
          {/* Left Column - Profile Image */}
          <div className='space-y-4'>
            <Skeleton className='m-[20px] mb-[40px] h-[260px] w-[260px] rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-6 w-32' />
            </div>
          </div>
          {/* Right Column - Profile Details */}
          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-24' />
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4'>
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>

                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>

                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>

                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-40' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-36' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-4 w-full' />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-6xl p-8'>
      <div className='grid grid-cols-[300px_1fr] gap-8'>
        {/* Left Column - Profile Image */}
        <div className='space-y-4'>
          <Avatar className='m-[20px] mb-[40px] h-[260px] w-[260px] rounded-full'>
            <AvatarFallback className='text-4xl'>
              <User className='h-32 w-32' />
            </AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <h1 className='text-3xl font-semibold'>{profileData?.Fullname}</h1>
            <p className='text-xl text-muted-foreground'>{profileData?.Role}</p>
          </div>
        </div>
        {/* Right Column - Profile Details */}
        <div className='space-y-8'>
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

          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {isCoursesLoading ? (
                <Skeleton className='h-4 w-full' />
              ) : coursesData?.length ? (
                <ul className='space-y-2'>
                  {coursesData.map((course) => (
                    <li key={course.CourseId}>
                      <Link to={`/courses/${course.CourseId}`}>
                        <div className='rounded-lg border p-4 transition-colors hover:bg-gray-100'>
                          <div>
                            <h3 className='text-lg font-semibold'>
                              {course.Name}
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                              {course.Description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-muted-foreground'>No enrolled course.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
