import { Card } from '@/components/common/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Assignment from '@/types/assignment';
import { Clock, Edit, MoreVertical, Trash } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const isDueOver = useMemo(() => {
    if (!assignment.dueDate) return false;
    return new Date(assignment.dueDate) < new Date();
  }, [assignment.dueDate]);

  return (
    <Card
      className='flex cursor-pointer flex-row items-center justify-between p-4 hover:shadow-md'
      onClick={() => {
        navigate(`./assignment/${assignment.assignmentId}`);
      }}
    >
      <div>
        <h2 className='mb-2 text-sm font-semibold'>{assignment.name}</h2>
        <span
          className={cn(
            'flex w-full items-center gap-2 text-[10px]',
            isDueOver ? 'text-red-500' : 'text-gray-500',
          )}
        >
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
          <DropdownMenuTrigger
            className='cursor-pointer focus:outline-none'
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className='h-5 w-5 text-gray-500' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className='flex cursor-pointer items-center gap-2'
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            >
              <Edit className='h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex cursor-pointer items-center gap-2 text-red-600'
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
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
export default AssignmentCard;
