import { Badge } from '@/components/common/ui/badge';
import { Button } from '@/components/common/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card';
import { useGetAssignment } from '@/hooks/api/useAssignmentApi';
import useAuth from '@/hooks/useAuth';
import { useCustomParams } from '@/utils/helper';
import {
  Calendar,
  Clock,
  Edit,
  FileQuestion,
  FileText,
  Send,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssignmentDetailPage = () => {
  const { assignmentId, courseId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const { data: assignment } = useGetAssignment(courseId, assignmentId);

  if (!assignment) {
    return null;
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <div className='w-72 rounded-md border-2 border-slate-800 text-center'>
        Sidebar
      </div>

      <div className='container m-8 max-w-4xl'>
        {/* Header Section */}
        <div className='mb-8 space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tight'>
                {assignment.name}
              </h1>
              <div className='mt-2 flex items-center gap-2 sm:flex-col sm:items-start'>
                {assignment.dueDate && (
                  <Badge
                    variant='secondary'
                    className='flex items-center gap-2'
                  >
                    <Calendar className='h-4 w-4' />
                    Due: {formatDate(assignment.dueDate)}
                  </Badge>
                )}
                <Badge variant='outline' className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  {assignment.canRetry
                    ? 'Multiple attempts allowed'
                    : 'Single attempt only'}
                </Badge>
              </div>
            </div>
            {role === 'Teacher' && (
              <Button
                variant='default'
                className='bg-blue-600 hover:bg-blue-700'
                onClick={() => navigate(`./edit`)}
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit Assignment
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className='space-y-6'>
          <Card className='border-2'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-5 w-5 text-blue-600' />
                <p className='text-base'>Assignment Details</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose max-w-none space-y-6'>
                <div className='rounded-lg bg-slate-100 p-6'>
                  <div className='whitespace-pre-wrap'>
                    {assignment.content}
                  </div>
                </div>

                <div className='flex justify-between text-sm text-slate-600'>
                  <div className='space-y-1'>
                    <p>Created: {formatDate(assignment.createdAt)}</p>
                    <p>Last updated: {formatDate(assignment.updatedAt)}</p>
                  </div>
                  {assignment.canViewScore && (
                    <Badge variant='secondary'>
                      Scores visible to students
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {role === 'Teacher' ? (
            <Card className='border-2'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <FileQuestion className='h-5 w-5 text-blue-600' />
                  <p className='text-base'>Questions Section</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='rounded-lg bg-slate-50 p-6'>
                  <p>Questions will be displayed here for teachers</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700'
              onClick={() => navigate('./submit')}
            >
              <Send className='mr-2 h-5 w-5' />
              Start Assignment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailPage;
