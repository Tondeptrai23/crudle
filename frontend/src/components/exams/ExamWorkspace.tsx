import WorkspaceQuestionCard from '@/components/assignments/WorkspaceQuestionCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/common/ui/alert-dialog';
import { Card } from '@/components/common/ui/card';
import LoadingButton from '@/components/common/ui/LoadingButton';
import { cn } from '@/lib/utils';
import { CreateQuestionDto } from '@/types/assignment';
import { ExamSubmitDto } from '@/types/exam';
import { useEffect, useState } from 'react';

interface ExamWorkspaceProps {
  examId: number;
  submissionId: number;
  questions: CreateQuestionDto[];
  initialAnswers?: Record<number, string>;
  onSubmit: (data: ExamSubmitDto) => Promise<void>;
  onAutoSubmit: (data: ExamSubmitDto) => Promise<void>;
  onAnswersChange?: (answers: Record<number, string>) => void;
  remainingTime: number;
}

const ExamWorkspace = ({
  examId,
  submissionId,
  questions,
  initialAnswers,
  onSubmit,
  onAutoSubmit,
  onAnswersChange,
  remainingTime,
}: ExamWorkspaceProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >(initialAnswers || {});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Auto-submit effect when time is up
  useEffect(() => {
    if (remainingTime <= 3000 && remainingTime > 0) {
      const timer = setTimeout(() => {
        handleAutoSubmit();
      }, remainingTime - 100); // Subtract a small buffer to ensure it submits before time completely runs out

      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  // Update session storage when answers change
  useEffect(() => {
    onAnswersChange?.(selectedAnswers);
  }, [selectedAnswers, onAnswersChange]);

  const handleAnswerSelect = (questionId: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const submitData = prepareSubmitData();
      setShowSubmitDialog(false);
      await onSubmit(submitData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoSubmit = async () => {
    const submitData = prepareSubmitData();
    await onAutoSubmit(submitData);
  };

  const prepareSubmitData = (): ExamSubmitDto => ({
    examId,
    submissionId,
    answers: questions.map((q) => ({
      questionId: q.questionId,
      value: selectedAnswers[q.questionId] || '',
    })),
    submittedAt: new Date(),
  });

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    document
      .getElementById(`question-${questions[index].questionId}`)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  const getCompletionStatus = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(selectedAnswers).length;
    return {
      answered: answeredQuestions,
      total: totalQuestions,
      percentage: Math.round((answeredQuestions / totalQuestions) * 100),
    };
  };

  const status = getCompletionStatus();

  return (
    <div className='container h-[calc(100vh-8rem)] p-4'>
      <div className='grid grid-cols-12 gap-4'>
        {/* Main workspace */}
        <div className='col-span-9 space-y-4 overflow-y-auto'>
          {questions.map((question, index) => (
            <div
              key={question.questionId}
              id={`question-${question.questionId}`}
            >
              <WorkspaceQuestionCard
                question={question}
                index={index}
                selectedAnswer={selectedAnswers[question.questionId]}
                onAnswerSelect={(value) =>
                  handleAnswerSelect(question.questionId, value)
                }
              />
            </div>
          ))}
        </div>

        {/* Control panel */}
        <div className='col-span-3'>
          <Card className='sticky top-4 p-4'>
            <div className='mb-4'>
              <h3 className='text-lg font-semibold'>Exam Progress</h3>
              <div className='mt-2 text-sm text-gray-600'>
                {status.answered} of {status.total} questions answered (
                {status.percentage}%)
              </div>
              {/* Progress bar */}
              <div className='mt-2 h-2 w-full rounded-full bg-gray-200'>
                <div
                  className='h-full rounded-full bg-blue-500 transition-all'
                  style={{ width: `${status.percentage}%` }}
                />
              </div>
            </div>

            <h3 className='mb-4 text-lg font-semibold'>Questions</h3>
            <div className='mb-6 grid grid-cols-3 gap-2 md:grid-cols-5'>
              {questions.map((question, index) => (
                <div
                  key={question.questionId}
                  className={cn(
                    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-medium transition-colors',
                    currentQuestionIndex === index
                      ? 'ring-2 ring-blue-500'
                      : '',
                    selectedAnswers[question.questionId]
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                  )}
                  onClick={() => navigateToQuestion(index)}
                >
                  {index + 1}
                </div>
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
              <div className='text-center text-sm text-gray-500'>
                Time remaining: {Math.floor(remainingTime / 60000)}m{' '}
                {Math.floor((remainingTime % 60000) / 1000)}s
              </div>
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
              {status.answered < status.total && (
                <div className='mt-2 text-yellow-600'>
                  Warning: You have only answered {status.answered} out of{' '}
                  {status.total} questions.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction
              className='bg-blue-500 hover:bg-blue-700'
              onClick={handleSubmit}
            >
              Submit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamWorkspace;
