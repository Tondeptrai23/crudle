import AssignmentWorkspace from '@/components/assignments/AssignmentWorkspace';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/common/ui/alert-dialog';
import { Card } from '@/components/common/ui/card';
import { Skeleton } from '@/components/common/ui/skeleton';
import {
  useGetAssignment,
  useResumeAssignment,
  useSubmitAssignment,
} from '@/hooks/api/useAssignmentApi';
import useAuth from '@/hooks/useAuth';
import { AssignmentSubmitDto } from '@/types/assignment';
import { useCustomParams } from '@/utils/helper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignmentSessionPage = () => {
  const { assignmentId, courseId, submissionId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [submitInfo, setSubmitInfo] = useState<any>(null);

  const {
    data: assignment,
    isLoading: isAssignmentLoading,
    error: assignmentError,
  } = useGetAssignment(courseId, assignmentId, role);
  const {
    data: submission,
    isLoading: isSubmissionLoading,
    error: submissionError,
  } = useResumeAssignment(courseId, assignmentId, submissionId);

  const submitAssignment = useSubmitAssignment();

  const isLoading = isAssignmentLoading || isSubmissionLoading;
  const error = assignmentError || submissionError;

  if (isLoading) {
    return <AssignmentWorkspaceSkeleton />;
  }

  if (!assignment || !submission || error) {
    throw error;
  }

  const handleSubmit = async (data: AssignmentSubmitDto) => {
    setSubmitInfo(
      await submitAssignment.mutateAsync({
        courseId,
        request: data,
      }),
    );

    setShowDialog(true);
  };

  return (
    <div className='container mx-auto'>
      <div>
        <h1 className='text-2xl font-bold'>{assignment.name}</h1>
      </div>
      <AssignmentWorkspace
        assignmentId={assignmentId}
        submissionId={submission.submissionId}
        questions={submission.questions}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Assignment Submitted Successfully
            </AlertDialogTitle>
            <AlertDialogDescription>
              {submitInfo && submitInfo.score
                ? `Your score is ${submitInfo.score}`
                : 'Your assignment is submitted'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className='bg-blue-500 hover:bg-blue-700'
              onClick={() => navigate(`/course/${courseId}/assignment`)}
            >
              Return
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const AssignmentWorkspaceSkeleton = () => (
  <div className='container h-[calc(100vh-4rem)] p-4'>
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-9 space-y-4'>
        {[1, 2, 3].map((i) => (
          <Card key={i} className='space-y-4 p-4'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-20 w-full' />
            <div className='space-y-2'>
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className='h-12 w-full' />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className='col-span-3'>
        <Card className='sticky top-4 p-4'>
          <Skeleton className='mb-4 h-6 w-32' />
          <div className='mb-6 grid grid-cols-5 gap-2'>
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className='h-10 w-10 rounded-full' />
            ))}
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-9 w-full' />
            <Skeleton className='h-9 w-full' />
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default AssignmentSessionPage;
