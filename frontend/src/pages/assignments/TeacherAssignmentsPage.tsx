import AssignmentCard from '@/components/assignments/AssignmentCard';
import { Button } from '@/components/common/ui/button';
import {
  useAssignments,
  useDeleteAssignment,
} from '@/hooks/api/useAssignmentApi';
import { useCustomParams } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const TeacherAssignmentsPage = () => {
  const { courseId } = useCustomParams();
  let { data: assignments } = useAssignments(courseId);
  const navigate = useNavigate();
  const deleteAssignment = useDeleteAssignment();

  if (!assignments) {
    assignments = [];
  }

  const handleDelete = async (assignmentId: number) => {
    await deleteAssignment.mutateAsync({ courseId, assignmentId });
  };

  const handleEdit = (assignmentId: number) => {
    navigate(`${assignmentId}/edit`);
  };

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <div className='w-72 rounded-md border-2 border-slate-800 text-center'>
        Sidebar
      </div>
      <div className='container m-8'>
        <div className='flex flex-row items-center justify-between'>
          <h1 className='my-8 text-2xl font-semibold'>Assignments</h1>
          <Button
            variant='default'
            className='bg-blue-500 hover:bg-blue-700'
            onClick={() => {
              navigate('./add');
            }}
          >
            Add Assignment
          </Button>
        </div>

        <div className='ml-4 grid grid-cols-2 gap-4'>
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.assignmentId}
              assignment={assignment}
              onDelete={() => {
                handleDelete(assignment.assignmentId);
              }}
              onEdit={() => {
                handleEdit(assignment.assignmentId);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignmentsPage;
