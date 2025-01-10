import QuestionCard from '@/components/assignments/QuestionCard';
import { Alert, AlertDescription } from '@/components/common/ui/alert';
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import { Separator } from '@/components/common/ui/separator';
import { useExamSubmission, useGetExam } from '@/hooks/api/useExamApi';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Role } from '@/types/enums';
import { useCustomParams } from '@/utils/helper';
import { CalendarDays, Clock, Timer, User2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamSubmissionPage = () => {
  const { examId, courseId, submissionId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();

  const {
    data: exam,
    isLoading: isExamLoading,
    error: examError,
  } = useGetExam(Number(courseId), Number(examId), role);

  const {
    data: submission,
    isLoading: isSubmissionLoading,
    error: submissionError,
  } = useExamSubmission(
    courseId.toString(),
    examId.toString(),
    submissionId.toString(),
    role,
  );

  const isLoading = isExamLoading || isSubmissionLoading;
  const error = examError || submissionError;

  // Check if exam has ended
  const now = new Date();
  const examEndDate = exam
    ? new Date(new Date(exam.startDate).getTime() + exam.duration * 60 * 1000)
    : null;
  const canViewSubmission = examEndDate && now > examEndDate;

  useEffect(() => {
    // Redirect if student tries to view submission before exam ends
    if (!isLoading && exam && role === Role.Student && !canViewSubmission) {
      navigate(`/course/${courseId}/exam/${examId}`);
    }
  }, [isLoading, exam, canViewSubmission, role]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!exam || !submission || error) {
    throw error;
  }

  return (
    <div className='container mx-auto p-4'>
      <Card className='mb-6 p-6'>
        <div className='space-y-4'>
          <div>
            <h1 className='text-2xl font-bold'>{exam.name}</h1>
            <p className='mt-2 text-muted-foreground'>{exam.content}</p>
          </div>

          <Separator />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            <div className='flex items-center space-x-2'>
              <User2 className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Student:</span>
              <span className='font-medium'>{submission.studentName}</span>
            </div>

            <div className='flex items-center space-x-2'>
              <Clock className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Started:</span>
              <span className='font-medium'>
                {submission.startedAt?.toLocaleString() ?? 'Not started'}
              </span>
            </div>

            <div className='flex items-center space-x-2'>
              <CalendarDays className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Submitted:</span>
              <span className='font-medium'>
                {submission.submittedAt?.toLocaleString() ?? 'Not submitted'}
              </span>
            </div>

            <div className='flex items-center space-x-2'>
              <Timer className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Duration:</span>
              <span className='font-medium'>{exam.duration} minutes</span>
            </div>
          </div>

          {role === Role.Student && !canViewSubmission && (
            <Alert variant='destructive'>
              <AlertDescription>
                You cannot view your submission until the exam has ended (
                {examEndDate?.toLocaleString()})
              </AlertDescription>
            </Alert>
          )}

          {submission.score !== null && (
            <div className='mt-4 flex items-center space-x-2'>
              <div className='text-sm text-muted-foreground'>Score:</div>
              <div className='text-lg font-medium'>
                {submission.score} / {exam.questions?.length ?? 0}
                <span className='ml-2 text-sm text-muted-foreground'>
                  (
                  {(
                    (submission.score / (exam.questions?.length ?? 1)) *
                    100
                  ).toFixed(2)}
                  %)
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className='container h-[calc(100vh-4rem)] p-4'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-9 space-y-4'>
            {submission.questions?.map((question, index) => (
              <div
                key={question.questionId}
                id={`question-${question.questionId}`}
              >
                <QuestionCard
                  key={question.questionId}
                  selected={
                    question.answers?.length && question.answers.length > 0
                      ? question.answers[0].value
                      : ''
                  }
                  showButton={false}
                  question={{
                    ...question,
                    answers: question.answers.map((a) => ({
                      answerId: a.answerId.toString(),
                      value: a.value,
                      isCorrect:
                        exam.questions
                          ?.find((q) => q.questionId === question.questionId)
                          ?.answers.find((ans) => ans.isCorrect)?.value ===
                        a.value,
                    })),
                  }}
                  index={index}
                  onDelete={() => {}}
                  onQuestionChange={() => {}}
                />
              </div>
            ))}
          </div>

          <div className='col-span-3'>
            <Card className='sticky top-4 p-4'>
              <h3 className='mb-4 text-lg font-semibold'>Questions</h3>
              <div className='mb-6 grid grid-cols-3 gap-2 md:grid-cols-5'>
                {exam.questions?.map((question, index) => {
                  const studentAnswer = submission.questions?.find(
                    (q) => q.questionId === question.questionId,
                  )?.answers?.[0]?.value;

                  const correctAnswer = question.answers.find(
                    (a) => a.isCorrect,
                  )?.value;

                  return (
                    <div
                      key={question.questionId}
                      className={cn(
                        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-medium transition-colors',
                        role === Role.Student && !canViewSubmission
                          ? 'bg-gray-300 text-gray-700'
                          : studentAnswer && studentAnswer === correctAnswer
                            ? 'bg-green-500 text-white'
                            : studentAnswer
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-300 text-gray-700',
                      )}
                      onClick={() => {
                        document
                          .getElementById(`question-${question.questionId}`)
                          ?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                      }}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
              <div className='space-y-2'>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSubmissionPage;
