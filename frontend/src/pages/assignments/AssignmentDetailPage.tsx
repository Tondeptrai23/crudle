import QuestionCard from '@/components/assignments/QuestionCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/accordion';
import { Badge } from '@/components/common/ui/badge';
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
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

      <div className='container m-4 max-w-4xl'>
        {/* Header Section */}
        <div className='mb-8'>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Questions Section */}
          {role === 'Teacher' ? (
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
