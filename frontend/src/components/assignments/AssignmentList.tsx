import AssignmentCard from '@/components/assignments/AssignmentCard';
import { Button } from '@/components/common/ui/button';
import {
  useAssignments,
  useDeleteAssignment,
} from '@/hooks/api/useAssignmentApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { getErrorMessage } from '@/lib/utils';
import { Role } from '@/types/enums';
import { useCustomParams } from '@/utils/helper';
import { Package, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../common/ui/input';
import { Skeleton } from '../common/ui/skeleton';

const EmptyState = () => (
  <div className='py-12 text-center'>
    <Package className='mx-auto h-12 w-12 text-gray-400' />
    <h3 className='mt-2 text-sm font-semibold text-gray-900'>No assignments</h3>
    <p className='mt-1 text-sm text-gray-500'>There are no assignments.</p>
  </div>
);

const AssignmentList = () => {
  const { courseId } = useCustomParams();
  const { toast } = useToast();
  const { role } = useAuth();
  const navigate = useNavigate();
  const deleteAssignment = useDeleteAssignment();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: assignments,
    isLoading,
    error,
  } = useAssignments(courseId, role, {
    page,
    pageSize,
    filters: {
      name: debouncedSearch,
    },
    sort: { key: 'dueDate', direction: 'desc' },
  });

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
    navigate(`assignment/${assignmentId}/edit`);
  };

  if (isLoading) {
    return (
      <div className='container mx-auto space-y-4 p-6'>
        <div className='flex flex-col gap-4'>
          {[1, 2].map((i) => (
            <Skeleton key={i} className='h-[100px] w-full' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex items-center gap-4'>
        <div className='flex-1'>
          <Input
            type='search'
            placeholder='Search assignments...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-sm'
          />
        </div>
        {role === Role.Teacher && (
          <Button
            variant='default'
            className='inline-flex items-center gap-2'
            onClick={() => navigate('./assignment/add')}
          >
            <Plus className='h-4 w-4' />
            Add Assignment
          </Button>
        )}
      </div>

      {assignments?.data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='flex flex-col gap-4'>
          {assignments?.data.map((assignment) => (
            <AssignmentCard
              key={assignment.assignmentId}
              assignment={assignment}
              showButton={role === Role.Teacher}
              onDelete={() => handleDelete(assignment.assignmentId)}
              onEdit={() => handleEdit(assignment.assignmentId)}
            />
          ))}
        </div>
      )}

      {assignments && assignments.totalPages > 0 && (
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-muted-foreground'>
            Showing {(page - 1) * pageSize + 1} to{' '}
            {Math.min(page * pageSize, assignments.totalItems)} of{' '}
            {assignments.totalItems} assignments
          </div>
          {assignments.totalPages > 1 && (
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setPage((p) =>
                    assignments.totalPages
                      ? Math.min(assignments.totalPages, p + 1)
                      : p + 1,
                  )
                }
                disabled={page === assignments.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default AssignmentList;
