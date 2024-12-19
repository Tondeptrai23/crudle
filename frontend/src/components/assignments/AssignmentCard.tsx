import { Card } from '@/components/common/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import Assignment from '@/types/assignment';
import { Clock, Edit, MoreVertical, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../common/ui/skeleton';

type AssignmentCardProps = {
  assignment: Assignment;
  showButton?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  showButton = false,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <Card className='flex flex-row items-center justify-between p-4'>
      <div
        className='cursor-pointer'
        onClick={() => {
          navigate(`./${assignment.assignmentId}`);
        }}
      >
        <h2 className='mb-2 text-sm font-semibold'>{assignment.name}</h2>
        <span className='flex w-full items-center gap-2 text-[10px] text-gray-500'>
          <Clock className='inline-block h-4 w-4' />
          {assignment.dueDate
            ? new Date(assignment.dueDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'No due date'}
        </span>
      </div>
      {showButton && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className='cursor-pointer focus:outline-none'>
            <MoreVertical className='h-5 w-5 text-gray-500' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className='flex cursor-pointer items-center gap-2'
              onClick={onEdit}
            >
              <Edit className='h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex cursor-pointer items-center gap-2 text-red-600'
              onClick={onDelete}
            >
              <Trash className='h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Card>
  );
};

export const AssignmentCardSkeleton = () => (
  <Card className='flex flex-row items-center justify-between p-4'>
    <div className='w-full space-y-3'>
      <Skeleton className='h-4 w-48' />
      <Skeleton className='h-3 w-32' />
    </div>
    <Skeleton className='h-8 w-8 rounded-full' />
  </Card>
);

export default AssignmentCard;
