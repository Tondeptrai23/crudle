// components/exams/ExamDetail.tsx
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
  useCanModifyExam,
  useGetExam,
  useStartExam,
} from '@/hooks/api/useExamApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { getErrorMessage } from '@/lib/utils';
import { Role } from '@/types/enums';
import { useCustomParams } from '@/utils/helper';
import {
  Calendar,
  Clock,
  Edit,
  FileQuestion,
  FileText,
  Send,
  Undo2,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../assignments/QuestionCard';

const ExamDetail = () => {
  const { examId, courseId } = useCustomParams();
  const { role } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: exam, isLoading, error } = useGetExam(courseId, examId, role);
  const startExam = useStartExam();
  const [isStarting, setIsStarting] = useState(false);

  if (isLoading) {
    return (
      <CourseLayout>
        <ExamDetailSkeleton />
      </CourseLayout>
    );
  }

  if (error || !exam) {
    throw error;
  }

  const canModify = useCanModifyExam(exam);

  const handleStartExam = async () => {
    try {
      setIsStarting(true);
      const response = await startExam.mutateAsync({
        courseId,
        examId,
      });

      navigate(`session/${response.submissionId}`);
    } catch (error) {
      toast({
        title: 'Failed to start exam',
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

  const getExamStatus = () => {
    const now = new Date();
    const startDate = new Date(exam.startDate);
    const endDate = new Date(startDate.getTime() + exam.duration * 60 * 1000);

    if (now < startDate) {
      return {
        label: 'Not Started',
        variant: 'outline' as const,
      };
    } else if (now > endDate) {
      return {
        label: 'Ended',
        variant: 'secondary' as const,
      };
    } else {
      return {
        label: 'In Progress',
        variant: 'default' as const,
      };
    }
  };

  const status = getExamStatus();

  return (
    <CourseLayout lastHeaderItem={exam.name}>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tight'>{exam.name}</h1>
            <div className='mt-2 flex flex-wrap items-center gap-2'>
              <Badge variant='secondary' className='flex items-center gap-2'>
                <Calendar className='h-4 w-4' />
                Start: {formatDate(exam.startDate)}
              </Badge>
              <Badge variant='outline' className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                Duration: {exam.duration} minutes
              </Badge>
              {<Badge variant={status.variant}>{status.label}</Badge>}
            </div>
          </div>
          <div className='flex flex-col items-end gap-2'>
            {role === Role.Teacher && (
              <Button
                variant='default'
                className='bg-blue-600 hover:bg-blue-700'
                onClick={() => navigate(`./edit`)}
                disabled={!canModify}
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit Exam
              </Button>
            )}
            <Button
              variant='outline'
              onClick={() => navigate('../..?tab=exams', { relative: 'path' })}
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
            defaultValue='exam-details'
          >
            <AccordionItem value='exam-details' className='border-none'>
              <AccordionTrigger className='px-6 py-4 hover:no-underline'>
                <div className='flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-blue-600' />
                  <p className='text-base'>Exam Details</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-6 pb-4'>
                <div className='prose max-w-none space-y-6'>
                  <div className='rounded-lg bg-slate-100 p-6'>
                    <div className='whitespace-pre-wrap'>{exam.content}</div>
                  </div>

                  <div className='flex justify-between text-sm text-slate-600'>
                    <div className='space-y-1'>
                      <p className='m-0'>
                        Created: {formatDate(exam.createdAt)}
                      </p>
                      <p>Last updated: {formatDate(exam.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Questions Section - Only visible for teachers */}
        {role === Role.Teacher && exam.questions && (
          <Card className='border-2'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='questions-section' className='border-none'>
                <AccordionTrigger className='px-6 py-4 hover:no-underline'>
                  <div className='flex items-center gap-2'>
                    <FileQuestion className='h-5 w-5 text-blue-600' />
                    <p className='text-base'>Questions Preview</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='px-6 pb-4'>
                  <div className='space-y-4'>
                    {exam.questions.map((question, index) => (
                      <QuestionCard
                        key={question.questionId}
                        question={question}
                        index={index}
                        showButton={false}
                        onDelete={() => {}}
                        onQuestionChange={() => {}}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        )}

        {/* Start Exam Button - Only for students */}
        {role === Role.Student && (
          <div className='flex items-center justify-center'>
            <LoadingButton
              size='lg'
              className='bg-blue-500 hover:bg-blue-700'
              onClick={handleStartExam}
              isLoading={isStarting}
              disabled={
                new Date() < new Date(exam.startDate) ||
                new Date() >
                  new Date(
                    new Date(exam.startDate).getTime() +
                      exam.duration * 60 * 1000,
                  )
              }
            >
              <Send className='mr-2 h-5 w-5' />
              {isStarting
                ? 'Starting...'
                : new Date() < new Date(exam.startDate)
                  ? 'Exam not started yet'
                  : new Date() >
                      new Date(
                        new Date(exam.startDate).getTime() +
                          exam.duration * 60 * 1000,
                      )
                    ? 'Exam ended'
                    : 'Start Exam'}
            </LoadingButton>
          </div>
        )}
      </div>
    </CourseLayout>
  );
};

const ExamDetailSkeleton = () => (
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

export default ExamDetail;
