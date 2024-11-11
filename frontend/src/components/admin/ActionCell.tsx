import { Button } from '@/components/common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { ActionCellProps } from '@/types/table';
import { EllipsisVertical, Loader2 } from 'lucide-react';
import React from 'react';
import LoadingButton from '../common/ui/LoadingButton';

const ActionCell: React.FC<ActionCellProps> = ({
  isEditing = false,
  isDeleting = false,
  isSaving = false,
  onEdit = () => {},
  onDelete = () => {},
  onSave = () => {},
  onCancel = () => {},
  disabledActions = {
    edit: false,
    delete: true,
  },
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
        <Button
          className='h-8 w-8 rounded-full border-0 p-1 hover:bg-gray-200 data-[state=open]:bg-gray-200'
          variant={'outline'}
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        side='right'
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {!disabledActions.edit && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          </>
        )}
        {!disabledActions.delete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
