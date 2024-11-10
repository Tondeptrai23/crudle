import { Button } from '@/components/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { EllipsisVertical, Loader2 } from 'lucide-react';
import React from 'react';
import LoadingButton from './LoadingButton';

interface ActionCellProps {
  isEditing: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const ActionCell: React.FC<ActionCellProps> = ({
  isEditing,
  isDeleting,
  isSaving,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) => {
  if (isDeleting) {
    return (
      <div className='flex p-1'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className='flex gap-2'>
        <Button
          onClick={onCancel}
          variant='outline'
          className='h-8 w-16'
          disabled={isSaving}
        >
          Cancel
        </Button>
        <LoadingButton
          variant='outline'
          className='h-8 w-16 items-center gap-2 bg-blue-500 text-white'
          onClick={onSave}
          isLoading={isSaving}
        >
          Save
        </LoadingButton>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='rounded-full p-1 hover:bg-gray-200'>
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
