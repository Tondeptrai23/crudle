import { Dialog, DialogContent } from '@/components/common/ui/dialog';
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
import { Filter, PlusCircle } from 'lucide-react';
import LoadingButton from '../common/ui/LoadingButton';
import ActionCell from './ActionCell';
import SkeletonTable from './SkeletonTable';

import TablePagination from '@/components/admin/TablePagination';
import {
  useGenericTableData,
  useTableAdd,
  useTableDelete,
  useTableEdit,
  useTableSearch,
} from '@/hooks/table/useTableDataOperation';
import { GenericTableProps } from '@/types/table';
import { Separator } from '../common/ui/separator';

// T is a generic type that extends an object with an id property
const GenericTable = <T extends { id: string }>({
  columns,
  actions,
  formComponent: CreateForm,
  disabledActions = {},
  queryHook,
}: GenericTableProps<T>) => {
  let { data, pagination, state, search } = useGenericTableData({
    useQueryHook: queryHook,
  });

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
  const { handleInputChange } = useTableSearch(search.onChange);

  if (state.isError) {
    return <div className='text-center text-red-500'>No data found</div>;
  }

  if (state.isLoading) {
    return <SkeletonTable rows={10} />;
  }

  let tableBody: React.ReactNode = null;

  if (state.isFetching) {
    tableBody = <SkeletonTable rows={pagination.pageSize} variant='body' />;
  } else if (data.length === 0 || state.isError) {
    tableBody = (
      <TableBody>
        <TableRow>
          <TableCell
            className='text-center text-red-500'
            colSpan={columns.length + 1}
          >
            {state.isError ? 'An error occurred' : 'No data found'}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  } else {
    tableBody = (
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
                  </TableCell>
                );
              })}
              <TableCell className='min-w-40 py-1'>
                <ActionCell
                  isEditing={editingRow === cell.id}
                  isDeleting={deletingRow === cell.id && isDeleting}
                  isSaving={isSaving}
                  onEdit={() => handleEdit(cell.id)}
                  onDelete={() => handleDelete(cell.id)}
                  onSave={() => handleSave(cell.id)}
                  onCancel={handleCancel}
                  disabledActions={disabledActions}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  return (
    <>
      <div className='flex flex-row items-center gap-4 px-4'>
        <LoadingButton
          variant='outline'
          className='items-center gap-2'
          onClick={handleShowDialog}
          isLoading={isAdding}
        >
          <PlusCircle className='h-5 w-5' />
          Add
        </LoadingButton>
        <div className='flex-grow' />
        <Input
          placeholder='Search'
          className='w-1/4'
          onChange={handleInputChange}
        />
        <LoadingButton variant='outline' className='items-center gap-2'>
          <Filter className='h-5 w-5' />
          DoB
        </LoadingButton>
        <div className='flex-grow' />
        {/* PLACEHOLDER */}
        <LoadingButton variant='outline' className='items-center gap-2'>
          <PlusCircle className='h-5 w-5' />
          Options
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

        {tableBody}
      </Table>

      <Separator />
      <TablePagination {...pagination} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <CreateForm onSubmit={handleAdd} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenericTable;
