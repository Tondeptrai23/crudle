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
import ExamWorkspace from '@/components/exams/ExamWorkspace';
import { useGetExam, useSubmitExam } from '@/hooks/api/useExamApi';
import useAuth from '@/hooks/useAuth';
import { ExamSubmitDto } from '@/types/exam';
import { useCustomParams } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ExamSession {
  examId: number;
  submissionId: number;
  answers: Record<number, string>;
  startDate: string;
}

const getStorageKey = (submissionId: number) => `exam_session_${submissionId}`;
const WARNING_TIME = 60 * 1000; // 1 minute warning

const ExamSessionPage = () => {
  const { examId, courseId, submissionId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();

  // States for dialogs
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [showAutoSubmitDialog, setShowAutoSubmitDialog] = useState(false);
  const [submitInfo, setSubmitInfo] = useState<any>(null);

  // Timer states
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isTimeAlmostUp, setIsTimeAlmostUp] = useState(false);

  const {
    data: exam,
    isLoading: isExamLoading,
    error: examError,
  } = useGetExam(courseId, examId, role);

  const submitExam = useSubmitExam();

  const saveToSession = (data: ExamSession) => {
    const key = getStorageKey(data.submissionId);
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromSession = (): ExamSession | null => {
    const key = getStorageKey(submissionId);
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const clearSession = () => {
    const key = getStorageKey(submissionId);
    sessionStorage.removeItem(key);
  };

  // Timer management
  useEffect(() => {
    if (!exam) return;

    const startDate = new Date(exam.startDate);
    const endDate = new Date(startDate.getTime() + exam.duration * 60 * 1000);
    const now = new Date();

    // If exam has ended, redirect back
    if (now > endDate) {
      navigate(`/course/${courseId}?tab=exams`);
      return;
    }

    const updateTimer = () => {
      const remaining = endDate.getTime() - new Date().getTime();
      setRemainingTime(Math.max(0, remaining));

      // Show warning when 1 minute remaining
      if (remaining <= WARNING_TIME && remaining > 3000 && !isTimeAlmostUp) {
        setIsTimeAlmostUp(true);
        setShowWarningDialog(true);
      }

      // Auto-submit 3 seconds before end
      if (remaining <= 3000 && remaining > 0) {
        setShowAutoSubmitDialog(true);
      }

      // Ensure timer stops at 0
      if (remaining <= 0) {
        clearInterval(timerInterval);
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update

    return () => clearInterval(timerInterval);
  }, [exam, isTimeAlmostUp]);

  // Load session data on mount
  useEffect(() => {
    const session = loadFromSession();
    if (
      session &&
      session.examId === examId &&
      session.submissionId === submissionId
    ) {
      // Restore answers from session
      // This will be handled by ExamWorkspace component
    }
  }, [examId, submissionId]);

  if (isExamLoading) {
    return <ExamWorkspaceSkeleton />;
  }

  if (!exam || examError) {
    throw examError;
  }

  const handleSubmit = async (data: ExamSubmitDto) => {
    try {
      const result = await submitExam.mutateAsync({
        courseId,
        request: {
          ...data,
          submittedAt: new Date(),
        },
      });

      setSubmitInfo(result);
      setShowSubmitDialog(true);
      clearSession();
    } catch (error) {
      // Handle error
    }
  };

  const handleAutoSubmit = async (data: ExamSubmitDto) => {
    try {
      const endTime =
        new Date(exam.startDate).getTime() + exam.duration * 60 * 1000;
      const result = await submitExam.mutateAsync({
        courseId,
        request: {
          ...data,
          submittedAt: new Date(endTime),
        },
      });

      setSubmitInfo(result);
      setShowSubmitDialog(true);
      clearSession();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{exam.name}</h1>
        <div className='text-xl font-semibold'>
          Time Remaining: {Math.floor(remainingTime / 60000)}m{' '}
          {Math.floor((remainingTime % 60000) / 1000)}s
        </div>
      </div>

      <ExamWorkspace
        examId={examId}
        submissionId={submissionId}
        questions={exam.questions}
        onSubmit={handleSubmit}
        onAutoSubmit={handleAutoSubmit}
        onAnswersChange={(answers) => {
          saveToSession({
            examId,
            submissionId,
            answers,
            startDate: exam.startDate
              ? new Date(exam.startDate).toISOString()
              : '',
          });
        }}
        initialAnswers={loadFromSession()?.answers}
        remainingTime={remainingTime}
      />

      {/* Submit Success Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exam Submitted Successfully</AlertDialogTitle>
            <AlertDialogDescription>
              {submitInfo && submitInfo.score
                ? `Your score is ${submitInfo.score}`
                : 'Your exam has been submitted successfully. You can view your results after the exam period ends.'}
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

      {/* Warning Dialog */}
      <AlertDialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time is Almost Up!</AlertDialogTitle>
            <AlertDialogDescription>
              You have less than 1 minute remaining. Please review your answers
              and submit now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className='bg-blue-500 hover:bg-blue-700'>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Auto-submit Dialog */}
      <AlertDialog open={showAutoSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your exam will be automatically submitted in 3 seconds.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const ExamWorkspaceSkeleton = () => (
  <div className='container mx-auto h-[calc(100vh-4rem)] p-4'>
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

export default ExamSessionPage;
