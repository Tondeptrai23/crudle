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
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import { cn } from '@/lib/utils';
import { CreateQuestionDto } from '@/types/assignment';
import { useState } from 'react';
import WorkspaceQuestionCard from './WorkspaceQuestionCard';

interface AssignmentWorkspaceProps {
  assignmentId: number;
  questions: CreateQuestionDto[];
  onSubmit: (data: any) => void;
}

const AssignmentWorkspace = ({
  assignmentId,
  questions,
  onSubmit,
}: AssignmentWorkspaceProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleAnswerSelect = (questionId: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const submitData = {
      assignmentId,
      answers: questions.map((q) => ({
        questionId: q.questionId,
        value: selectedAnswers[q.questionId] || '',
      })),
    };

    setShowSubmitDialog(false);
    onSubmit(submitData);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-12 gap-4'>
        {/* Main workspace */}
        <div className='col-span-9 space-y-4'>
          {questions.map((question, index) => (
            <WorkspaceQuestionCard
              key={question.questionId}
              question={question}
              index={index}
              selectedAnswer={selectedAnswers[question.questionId]}
              onAnswerSelect={(value) =>
                handleAnswerSelect(question.questionId, value)
              }
            />
          ))}
        </div>

        {/* Control panel */}
        <div className='col-span-3'>
          <Card className='sticky top-4 p-4'>
            <h3 className='mb-4 text-lg font-semibold'>Questions</h3>
            <div className='mb-6 grid grid-cols-5 gap-2'>
              {questions.map((question, index) => (
                <div
                  key={question.questionId}
                  className={cn(
                    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-medium transition-colors',
                    selectedAnswers[question.questionId]
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700',
                  )}
                  onClick={() => {
                    // You can add scroll to question functionality here
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
                className='w-full bg-blue-500 hover:bg-blue-700'
                onClick={() => setShowSubmitDialog(true)}
              >
                Submit
              </Button>
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
            <AlertDialogTitle>Submit Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this assignment? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
            <AlertDialogTitle>Cancel Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel? All your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continue working</AlertDialogCancel>
            <AlertDialogAction className='bg-blue-500 hover:bg-blue-700'>
              Yes, cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssignmentWorkspace;
