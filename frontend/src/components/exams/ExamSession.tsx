// components/exams/ExamSession.tsx
import { useExam } from '@/components/exams/ExamContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ExamSubmitDto } from '@/types/exam';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../common/ui/alert-dialog';
import { Button } from '../common/ui/button';
import { Card } from '../common/ui/card';
import LoadingButton from '../common/ui/LoadingButton';
import ExamQuestionCard from './ExamQuestionCard';

interface ExamSessionProps {
  examId: number;
  submissionId: number;
  onSubmit: (data: ExamSubmitDto) => Promise<void>;
  onCancel: () => void;
}

const ExamSession = ({
  examId,
  submissionId,
  onSubmit,
  onCancel,
}: ExamSessionProps) => {
  const {
    timeRemaining,
    answers,
    questions,
    setAnswer,
    getFormattedTime,
    getAnswersForSubmission,
    isPastDue,
  } = useExam();

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { toast } = useToast();

  // Auto-submit when time expires
  useEffect(() => {
    if (isPastDue && !isSubmitting) {
      handleSubmit();
    }
  }, [isPastDue]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const submitData = {
        examId,
        submissionId,
        answers: getAnswersForSubmission(),
        submittedAt: new Date(),
      };

      setShowSubmitDialog(false);
      await onSubmit(submitData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit exam. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    // Smooth scroll to the question
    document
      .getElementById(`question-${questions[index].questionId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className='container h-[calc(100vh-4rem)] p-4'>
      <div className='grid grid-cols-12 gap-4'>
        {/* Main workspace */}
        <div className='col-span-9 space-y-4'>
          <div className='sticky top-0 z-10 bg-white p-4 shadow'>
            <div className='flex items-center justify-between'>
              <div className='text-lg font-semibold'>
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div
                className={cn(
                  'font-mono text-lg',
                  timeRemaining <= 300 && 'animate-pulse text-red-500',
                )}
              >
                Time Remaining: {getFormattedTime()}
              </div>
            </div>
          </div>

          {questions.map((question, index) => (
            <div
              key={question.questionId}
              id={`question-${question.questionId}`}
              className={cn(
                'transition-opacity duration-200',
                index === currentQuestionIndex ? 'opacity-100' : 'opacity-50',
              )}
            >
              <ExamQuestionCard
                question={question}
                index={index}
                selectedAnswer={answers[question.questionId]}
                onAnswerSelect={(value) =>
                  setAnswer(question.questionId, value)
                }
              />
            </div>
          ))}
        </div>

        {/* Control panel */}
        <div className='col-span-3'>
          <Card className='sticky top-4 p-4'>
            <h3 className='mb-4 text-lg font-semibold'>Questions Navigator</h3>
            <div className='mb-6 grid grid-cols-4 gap-2'>
              {questions.map((question, index) => (
                <Button
                  key={question.questionId}
                  variant={answers[question.questionId] ? 'default' : 'outline'}
                  size='sm'
                  className={cn(
                    'h-10 w-full',
                    index === currentQuestionIndex && 'ring-2 ring-blue-500',
                    answers[question.questionId] &&
                      'bg-green-500 hover:bg-green-600',
                  )}
                  onClick={() => navigateQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <div className='space-y-2'>
              <LoadingButton
                className='w-full bg-blue-500 hover:bg-blue-700'
                onClick={() => setShowSubmitDialog(true)}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
              </LoadingButton>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => setShowCancelDialog(true)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Exam</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this exam? This action cannot be
              undone.
              {Object.keys(answers).length < questions.length && (
                <div className='mt-2 text-red-500'>
                  Warning: You have unanswered questions!
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Exam</AlertDialogCancel>
            <AlertDialogAction
              className='bg-blue-500 hover:bg-blue-700'
              onClick={handleSubmit}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Exam</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel? All your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continue exam</AlertDialogCancel>
            <AlertDialogAction
              className='bg-blue-500 hover:bg-blue-700'
              onClick={onCancel}
            >
              Yes, cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamSession;
