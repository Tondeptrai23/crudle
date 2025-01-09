// pages/ExamSessionPage.tsx
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
import { ExamProvider } from '@/components/exams/ExamContext';
import ExamSession from '@/components/exams/ExamSession';
import {
  useGetExam,
  useStartExam,
  useSubmitExam,
} from '@/hooks/api/useExamApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { ExamSubmitDto } from '@/types/exam';
import { useCustomParams } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamSessionPage = () => {
  const { examId, courseId, submissionId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [submitInfo, setSubmitInfo] = useState<any>(null);

  const {
    data: exam,
    isLoading: isExamLoading,
    error: examError,
  } = useGetExam(courseId, examId, role);

  const startExam = useStartExam();
  const submitExam = useSubmitExam();

  useEffect(() => {
    // Check if exam can be started
    if (exam && !submissionId) {
      const now = new Date();
      const startDate = new Date(exam.startDate);
      const endDate = new Date(startDate.getTime() + exam.duration * 60 * 1000);

      if (now < startDate) {
        toast({
          title: 'Error',
          description: 'This exam has not started yet',
          variant: 'destructive',
        });
        navigate(-1);
      } else if (now > endDate) {
        toast({
          title: 'Error',
          description: 'This exam has ended',
          variant: 'destructive',
        });
        navigate(-1);
      }
    }
  }, [exam]);

  const handleSubmit = async (data: ExamSubmitDto) => {
    setSubmitInfo(
      await submitExam.mutateAsync({
        courseId,
        request: data,
      }),
    );

    setShowDialog(true);
  };

  if (isExamLoading) {
    return <ExamSessionSkeleton />;
  }

  if (!exam || examError) {
    throw examError;
  }

  return (
    <ExamProvider>
      <div className='container mx-auto p-4'>
        <div>
          <h1 className='text-2xl font-bold'>{exam.name}</h1>
        </div>
        <ExamSession
          examId={examId}
          submissionId={submissionId}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />

        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exam Submitted Successfully</AlertDialogTitle>
              <AlertDialogDescription>
                {submitInfo && submitInfo.score !== undefined
                  ? `Your score is ${submitInfo.score}`
                  : 'Your exam has been submitted'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                className='bg-blue-500 hover:bg-blue-700'
                onClick={() => navigate(`/course/${courseId}/exam`)}
              >
                Return
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ExamProvider>
  );
};

const ExamSessionSkeleton = () => (
  <div className='container mx-auto h-[calc(100vh-4rem)] p-4'>
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-9 space-y-4'>
        {[1, 2, 3].map((i) => (
          <Card key={i} className='space-y-4 p-4'>
            <Skeleton className='h-8 w-32' />
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
          <div className='mb-6 grid grid-cols-4 gap-2'>
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className='h-10 w-full rounded-md' />
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

export default ExamSessionPage;
