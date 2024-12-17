import { Card } from '@/components/common/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import Assignment from '@/types/assignment';
import { Edit, MoreVertical, Trash } from 'lucide-react';

type AssignmentCardProps = {
  assignment: Assignment;
  onEdit: () => void;
  onDelete: () => void;
};

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between gap-4'>
        <h2 className='mb-2 font-semibold'>{assignment.name}</h2>

        <div className='flex items-center'>
          <span className='mr-2 text-xs text-gray-500'>
            {assignment.dueDate
              ? new Date(assignment.dueDate).toLocaleDateString('en-GB')
              : 'No due date'}
          </span>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='focus:outline-none'>
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
        </div>
      </div>
    </Card>
  );
};

export default AssignmentCard;
