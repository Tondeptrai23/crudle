// src/pages/ProfilePage.tsx
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/common/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card';
import { Skeleton } from '@/components/common/ui/skeleton';
import { useProfileData } from '@/hooks/api/useProfileApi';
import { useRoleBasedCourses } from '@/hooks/api/useCourseApi';
import { ProfileSkeleton } from '@/components/user/ProfileSkeleton';
import ProfileDetail from '@/components/user/ProfileDetail';

const ProfilePage = () => {
  const { data: profileData, isLoading: isProfileLoading } = useProfileData();
  const role = localStorage.getItem('role');
  const { data: coursesData, isLoading: isCoursesLoading } =
    useRoleBasedCourses(role);

  if (isProfileLoading) {
    return <ProfileSkeleton />;
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
            <p className='text-xl text-muted-foreground'>
              {sessionStorage.role}
            </p>
          </div>
        </div>
        {/* Right Column - Profile Details */}
        <div className='space-y-8'>
          <ProfileDetail profileData={profileData} />

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
                      <Link to={`/course/${course.CourseId}`}>
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
