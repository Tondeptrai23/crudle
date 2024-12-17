import AssignmentCard, {
  AssignmentCardSkeleton,
} from '@/components/assignments/AssignmentCard';
import { Button } from '@/components/common/ui/button';
import {
  useAssignments,
  useDeleteAssignment,
} from '@/hooks/api/useAssignmentApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { getErrorMessage } from '@/lib/utils';
import { useCustomParams } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const AssignmentsPage = () => {
  const { courseId } = useCustomParams();
  const { toast } = useToast();
  const { role } = useAuth();
  let { data: assignments, isLoading, error } = useAssignments(courseId, role);
  const navigate = useNavigate();
  const deleteAssignment = useDeleteAssignment();

  if (!assignments) {
    assignments = [];
  }

  if (error) {
    throw error;
  }

  const handleDelete = async (assignmentId: number) => {
    try {
      await deleteAssignment.mutateAsync({ courseId, assignmentId });

      toast({
        title: 'Success',
        description: 'Assignment deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    }
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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <AssignmentCardSkeleton key={index} />
            ))
          ) : assignments?.length === 0 ? (
            <div className='col-span-2 py-8 text-center text-gray-500'>
              No assignments found
            </div>
          ) : (
            assignments?.map((assignment) => (
              <AssignmentCard
                key={assignment.assignmentId}
                assignment={assignment}
                showButton={role === 'Teacher'}
                onDelete={() => handleDelete(assignment.assignmentId)}
                onEdit={() => handleEdit(assignment.assignmentId)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
