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

  const { data: assignment } = useGetAssignment(courseId, assignmentId, role);
  const { data: submission } = useResumeAssignment(
    courseId,
    assignmentId,
    submissionId,
  );

  const submitAssignment = useSubmitAssignment();

  if (!assignment || !submission) {
    return null;
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
    <>
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
    </>
  );
};

export default AssignmentSessionPage;
