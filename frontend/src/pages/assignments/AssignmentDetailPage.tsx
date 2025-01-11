import QuestionCard from '@/components/assignments/QuestionCard';
import SubmissionsTable from '@/components/submissions/SubmissionsTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/accordion';
import { Badge } from '@/components/common/ui/badge';
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import LoadingButton from '@/components/common/ui/LoadingButton';
import { Skeleton } from '@/components/common/ui/skeleton';
import CourseLayout from '@/components/course/CourseLayout';
import {
  useGetAssignment,
  useStartAssignment,
} from '@/hooks/api/useAssignmentApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { getErrorMessage } from '@/lib/utils';
import { Role } from '@/types/enums';
import { useCustomParams } from '@/utils/helper';
import {
  Calendar,
  ClipboardCheck,
  Clock,
  Edit,
  FileQuestion,
  FileText,
  Send,
  Undo2,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmissionsVariant } from '@/types/submission';

const AssignmentDetailPage = () => {
  const { assignmentId, courseId } = useCustomParams();
  const { role } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    data: assignment,
    isLoading,
    error,
  } = useGetAssignment(courseId, assignmentId, role);
  const startAssignment = useStartAssignment();
  const [isStarting, setIsStarting] = useState(false);

  if (isLoading) {
    return (
      <CourseLayout>
        <AssignmentDetailSkeleton />
      </CourseLayout>
    );
  }

  if (error || !assignment) {
    throw error;
  }

  const handleStartAssignment = async () => {
    try {
      setIsStarting(true);
      const response = await startAssignment.mutateAsync({
        courseId,
        assignmentId,
      });

      navigate(`session/${response.submissionId}`);
    } catch (error) {
      toast({
        title: 'Failed to start assignment',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsStarting(false);
    }
  };

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
    <CourseLayout lastHeaderItem={assignment.name}>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tight'>
              {assignment.name}
            </h1>
            <div className='mt-2 flex items-center gap-2 sm:flex-col sm:items-start'>
              {assignment.dueDate && (
                <Badge variant='secondary' className='flex items-center gap-2'>
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
          <div className='flex flex-col items-end gap-2'>
            {role === Role.Teacher && (
              <Button
                variant='default'
                className='bg-blue-600 hover:bg-blue-700'
                onClick={() => navigate(`./edit`)}
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit Assignment
              </Button>
            )}
            <Button
              variant='outline'
              onClick={() =>
                navigate('../..?tab=assignments', { relative: 'path' })
              }
            >
              <Undo2 className='mr-2 h-4 w-4' />
              Return
            </Button>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {/* Main Content */}
        <Card className='border-2'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
            defaultValue='assignment-details'
          >
            <AccordionItem value='assignment-details' className='border-none'>
              <AccordionTrigger className='px-6 py-4 hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-blue-600' />
                  <p className='text-base'>Assignment Details</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-6 pb-4'>
                <div className='prose max-w-none space-y-6'>
                  <div className='rounded-lg bg-slate-100 p-6'>
                    <div className='whitespace-pre-wrap'>
                      {assignment.content}
                    </div>
                  </div>

                  <div className='flex justify-between text-sm text-slate-600'>
                    <div className='space-y-1'>
                      <p className='m-0'>
                        Created: {formatDate(assignment.createdAt)}
                      </p>
                      <p>Last updated: {formatDate(assignment.updatedAt)}</p>
                    </div>
                    <div className='self-end'>
                      {assignment.canViewScore && (
                        <Badge variant='secondary'>
                          Scores visible to students
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Questions Section */}
        {role === Role.Teacher && (
          <>
            <Card className='border-2'>
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem
                  value='questions-section'
                  className='border-none'
                >
                  <AccordionTrigger className='px-6 py-4 hover:no-underline'>
                    <div className='flex items-center gap-2'>
                      <FileQuestion className='h-5 w-5 text-blue-600' />
                      <p className='text-base'>Questions Section</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='px-6 pb-4'>
                    <div className='space-y-4'>
                      {assignment.questions.map((question, index) => (
                        <QuestionCard
                          selected={false}
                          key={question.questionId}
                          showButton={false}
                          question={question}
                          index={index}
                          onDelete={() => {}}
                          onQuestionChange={() => {}}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </>
        )}

        <Card className='border-2'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
            defaultValue='assignment-details'
          >
            <AccordionItem value='assignment-details' className='border-none'>
              <AccordionTrigger className='px-6 py-4 hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <ClipboardCheck className='h-5 w-5 text-blue-600' />
                  {role === Role.Teacher ? (
                    <p className='text-base'>Submissions</p>
                  ) : (
                    <p className='text-base'>Your Submissions</p>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-6 pb-4'>
                <SubmissionsTable
                  courseId={courseId.toString()}
                  assignmentId={assignmentId.toString()}
                  maxScore={assignment.totalQuestions}
                  variant={
                    role === Role.Teacher
                      ? SubmissionsVariant.LATEST
                      : SubmissionsVariant.INDIVIDUAL
                  }
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {role === Role.Student && (
          <div className='flex items-center justify-center'>
            <LoadingButton
              size='lg'
              className='bg-blue-500 hover:bg-blue-700'
              onClick={handleStartAssignment}
              isLoading={isStarting}
            >
              <Send className='mr-2 h-5 w-5' />
              {isStarting ? 'Starting...' : 'Start Assignment'}
            </LoadingButton>
          </div>
        )}
      </div>
    </CourseLayout>
  );
};

const AssignmentDetailSkeleton = () => (
  <div className='space-y-6'>
    <div className='flex items-center justify-between'>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-64' />
        <div className='flex gap-2'>
          <Skeleton className='h-5 w-32' />
          <Skeleton className='h-5 w-40' />
        </div>
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-9 w-32' />
      </div>
    </div>

    <Card className='border-2'>
      <div className='space-y-4 p-6'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className='h-5 w-40' />
        </div>
        <Skeleton className='h-32 w-full' />
      </div>
    </Card>

    <Card className='border-2'>
      <div className='space-y-4 p-6'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className='h-5 w-40' />
        </div>
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <div className='grid grid-cols-2 gap-4'>
                <Skeleton className='h-10' />
                <Skeleton className='h-10' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

export default AssignmentDetailPage;
