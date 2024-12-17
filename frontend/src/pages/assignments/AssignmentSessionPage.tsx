import AssignmentWorkspace from '@/components/assignments/AssignmentWorkspace';
import { useGetAssignment } from '@/hooks/api/useAssignmentApi';
import { useCustomParams } from '@/utils/helper';

const AssignmentSessionPage = () => {
  const { assignmentId, courseId } = useCustomParams();
  const { data: assignment } = useGetAssignment(courseId, assignmentId);

  if (!assignment) {
    return null;
  }

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'>{assignment.name}</h1>
      </div>
      <AssignmentWorkspace
        assignmentId={assignmentId}
        questions={assignment.questions}
        onSubmit={(data) => console.log('Submit data:', data)}
      />
    </>
  );
};

export default AssignmentSessionPage;
