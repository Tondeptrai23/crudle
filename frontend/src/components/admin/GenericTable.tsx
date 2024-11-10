import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/common/ui/dialog';
import { Input } from '@/components/common/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table';

import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import ActionCell from './ActionCell';
import LoadingButton from './LoadingButton';
import SkeletonTable from './SkeletonTable';

import {
  useTableAdd,
  useTableDelete,
  useTableEdit,
} from '@/hooks/table/useTableDataOperation';
import { GenericTableProps } from '@/types/table';

// T is a generic type that extends an object with an id property
const GenericTable = <T extends { id: string }>({
  data = [],
  columns,
  state: { isLoading = false, isError = false },
  actions,
  formComponent: CreateForm,
}: GenericTableProps<T>) => {
  const {
    editingRow,
    editedValues,
    fieldErrors,
    isSaving,
    handleEdit,
    handleCancel,
    handleSave,
    handleCellValueChange,
  } = useTableEdit(data, columns, actions);
  const { isDeleting, deletingRow, handleDelete } = useTableDelete(actions);
  const { isAdding, dialogOpen, setDialogOpen, handleAdd, handleShowDialog } =
    useTableAdd(actions);

  if (isError) {
    return <div className='text-center text-red-500'>No data found</div>;
  }

  if (isLoading) {
    return <SkeletonTable rows={10} />;
  }

  if (data.length === 0) {
    return <div className='text-center'>No data found</div>;
  }

  return (
    <>
      <div className='flex flex-row items-center gap-4 px-4'>
        <Input placeholder='Search' className='w-1/3' />{' '}
        {/* Placeholder for future */}
        <LoadingButton
          variant='outline'
          className='items-center gap-2'
          onClick={handleShowDialog}
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
                          className={cn(
                            'h-full w-full border-2 p-1 focus:border-slate-800 focus-visible:ring-transparent',
                            fieldErrors[String(column.key)]
                              ? 'border-red-500'
                              : '',
                          )}
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
                  <ActionCell
                    isEditing={editingRow === cell.id}
                    isDeleting={deletingRow === cell.id && isDeleting}
                    isSaving={isSaving}
                    onEdit={() => handleEdit(cell.id)}
                    onDelete={() => handleDelete(cell.id)}
                    onSave={() => handleSave(cell.id)}
                    onCancel={handleCancel}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader className='items-center'>
            <DialogTitle>Add Student</DialogTitle>
          </DialogHeader>
          <CreateForm onSubmit={handleAdd} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenericTable;
