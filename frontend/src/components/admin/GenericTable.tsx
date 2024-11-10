import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table';
import { EllipsisVertical, Loader2, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../common/ui/button';
import { Input } from '../common/ui/input';
import LoadingButton from './LoadingButton';
import SkeletonTable from './SkeletonTable';

export interface Column<T> {
  header: string;
  key: keyof T;
  editable?: boolean;
}

interface GenericTableProps<T> {
  data?: T[];
  columns: Column<T>[];
  state: TableState;
  actions?: {
    // Using `any` here because we don't know the shape of the data (DTO of T)
    save: (id: string | number, updatedData: any) => void | Promise<void>;
    delete: (id: string | number) => void | Promise<void>;
    add: () => void | Promise<void>;
  };
}

interface TableState {
  isLoading?: boolean;
  isError?: boolean;
  isAdding?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
}

// T is a generic type that extends an object with an id property
const GenericTable = <T extends { id: string | number }>({
  data = [],
  columns,
  state: {
    isLoading = false,
    isError = false,
    isAdding = false,
    isSaving = false,
    isDeleting = false,
  },
  actions,
}: GenericTableProps<T>) => {
  const [editingRow, setEditingRow] = useState<string | number | null>(null);
  const [editedValues, setEditedValues] = useState<T | null>(null);

  const [deletingRow, setDeletingRow] = useState<string | number | null>(null);

  if (isError) {
    return <div className='text-center text-red-500'>No data found</div>;
  }

  if (isLoading) {
    return <SkeletonTable rows={10} />;
  }

  if (data.length === 0) {
    return <div className='text-center'>No data found</div>;
  }

  const handleEditClick = (id: string | number) => {
    setEditingRow(id);
    // Find and set the entire row data
    const currentRow = data.find((row) => row.id === id);
    if (currentRow) {
      setEditedValues(currentRow);
    }
  };

  const handleDeleteClick = async (id: string | number) => {
    setDeletingRow(id);
    await actions?.delete?.(id);
    setDeletingRow(null);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedValues(null);
  };

  const handleSave = async (id: string | number) => {
    try {
      await actions?.save?.(id, editedValues);
      setEditingRow(null);
      setEditedValues(null);
    } catch (error) {
      console.error('Failed to save:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleCellValueChange = (key: keyof T, value: string) => {
    if (editedValues) {
      setEditedValues({
        ...editedValues,
        [key]: value,
      });
    }
  };

  const saveChangeButton = (id: number | string) => {
    return (
      <div className='flex gap-2'>
        <Button
          onClick={handleCancelEdit}
          variant='outline'
          className='h-8 w-16'
          disabled={isSaving}
        >
          Cancel
        </Button>

        <LoadingButton
          variant='outline'
          className='h-8 w-16 items-center gap-2 bg-blue-500 text-white'
          onClick={() => handleSave(id)}
          isLoading={isSaving}
        >
          Save
        </LoadingButton>
      </div>
    );
  };

  const renderActionCell = (id: number | string) => {
    if (deletingRow === id && isDeleting) {
      return (
        <div className='flex p-1'>
          <Loader2 className='h-6 w-6 animate-spin' />;
        </div>
      );
    } else if (editingRow === id) {
      return saveChangeButton(id);
    } else {
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
            <DropdownMenuItem
              onClick={() => {
                handleEditClick(id);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDeleteClick(id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  };

  return (
    <>
      <div className='flex flex-row items-center gap-4 px-4'>
        <Input placeholder='Search' className='w-1/3' />
        <LoadingButton
          variant='outline'
          className='items-center gap-2'
          onClick={actions?.add}
          isLoading={isAdding}
        >
          <PlusCircle className='h-5 w-5' />
          Add
        </LoadingButton>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableHead key={column.header} className='text-blue-500'>
                  {column.header}
                </TableHead>
              );
            })}
            <TableHead className='w-4 text-blue-500'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((cell) => {
            return (
              <TableRow className='p-0' key={cell.id}>
                {columns.map((column) => {
                  return (
                    <TableCell className='py-1'>
                      {editingRow === cell.id && column.editable ? (
                        <Input
                          value={String(
                            editedValues?.[column.key] ?? cell[column.key],
                          )}
                          onChange={(e) =>
                            handleCellValueChange(column.key, e.target.value)
                          }
                          className='h-full w-full p-1'
                        />
                      ) : (
                        String(cell[column.key])
                      )}
                      {/* "key" can be anything that is
                    a key of T, we need to convert it to string that react can render */}
                    </TableCell>
                  );
                })}
                <TableCell className='min-w-52 py-1'>
                  {renderActionCell(cell.id)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default GenericTable;
