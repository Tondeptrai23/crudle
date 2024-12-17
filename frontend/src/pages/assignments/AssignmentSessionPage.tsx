import AssignmentWorkspace from '@/components/assignments/AssignmentWorkspace';
import {
  useGetAssignment,
  useStartAssignment,
  useSubmitAssignment,
} from '@/hooks/api/useAssignmentApi';
import useAuth from '@/hooks/useAuth';
import { AssignmentSubmitDto } from '@/types/assignment';
import { useCustomParams } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const AssignmentSessionPage = () => {
  const { assignmentId, courseId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();

  const { data: assignment } = useGetAssignment(courseId, assignmentId, role);
  const { data: submission } = useStartAssignment(courseId, assignmentId);
  const submitAssignment = useSubmitAssignment();

  if (!assignment || !submission) {
    return null;
  }

  const handleSubmit = async (data: AssignmentSubmitDto) => {
    await submitAssignment.mutateAsync({ courseId, request: data });

    navigate('/assignments');
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
      />
    </>
  );
};

export default AssignmentSessionPage;
