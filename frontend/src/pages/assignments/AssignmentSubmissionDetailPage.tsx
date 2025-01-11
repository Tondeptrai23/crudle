import { useCustomParams } from '@/utils/helper';
import { AssignmentWorkspaceSkeleton } from './AssignmentSessionPage';
import useAuth from '@/hooks/useAuth';
import { useGetAssignment, useSubmission } from '@/hooks/api/useAssignmentApi';
import { Card } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import { cn } from '@/lib/utils';
import QuestionCard from '@/components/assignments/QuestionCard';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, User2 } from 'lucide-react';
import { Separator } from '@/components/common/ui/separator';
import { Role } from '@/types/enums';

const AssignmentSubmissionDetailPage: React.FC = () => {
  const { assignmentId, courseId, submissionId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();

  const {
    data: assignment,
    isLoading: isAssignmentLoading,
    error: assignmentError,
  } = useGetAssignment(courseId, assignmentId, role);
  const {
    data: submission,
    isLoading: isSubmissionLoading,
    error: submissionError,
  } = useSubmission(
    courseId.toString(),
    assignmentId.toString(),
    submissionId.toString(),
    role,
  );

  const isLoading = isAssignmentLoading || isSubmissionLoading;
  const error = assignmentError || submissionError;

  if (isLoading) {
    return <AssignmentWorkspaceSkeleton />;
  }

  if (!assignment || !submission || error) {
    throw error;
  }

  return (
    <div className='container mx-auto p-4'>
      <Card className='mb-6 p-6'>
        <div className='space-y-4'>
          <div>
            <h1 className='text-2xl font-bold'>{assignment.name}</h1>
            <p className='mt-2 text-muted-foreground'>{assignment.content}</p>
          </div>

          <Separator />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
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
          </div>

          {submission.score !== null && (
            <div className='mt-4 flex items-center space-x-2'>
              <div className='text-sm text-muted-foreground'>Score:</div>
              <div className='text-lg font-medium'>
                {submission.score} / {submission.answeredQuestions?.length ?? 0}
                <span className='ml-2 text-sm text-muted-foreground'>
                  (
                  {(
                    (submission.score /
                      (submission.answeredQuestions?.length ?? 1)) *
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
            {submission.answeredQuestions?.map((question, index) => (
              <div
                key={question.questionId}
                id={`question-${question.questionId}`}
              >
                <QuestionCard
                  key={question.questionId}
                  selected={
                    question.studentsAnswers?.length &&
                    question.studentsAnswers.length > 0
                      ? question.studentsAnswers[0].value
                      : ''
                  }
                  showButton={false}
                  question={question}
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
                {submission.answeredQuestions?.map((question, index) => (
                  <div
                    key={question.questionId}
                    className={cn(
                      'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-medium transition-colors',
                      role === Role.Student
                        ? 'bg-gray-300 text-gray-700'
                        : question.studentsAnswers?.length &&
                            question.studentsAnswers.length > 0 &&
                            question.answers.filter((a) => a.isCorrect).at(0)
                              ?.value ===
                              (question.studentsAnswers?.at(0)?.value ?? '')
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white',
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
                ))}
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

export default AssignmentSubmissionDetailPage;
