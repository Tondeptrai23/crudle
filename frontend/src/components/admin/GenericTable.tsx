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
import { PlusCircle } from 'lucide-react';
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
import { useMemo } from 'react';
import EnumFilter from '../common/filter/EnumFilter';
import RangeFilter from '../common/filter/RangeFilter';
import { Separator } from '../common/ui/separator';
import TableSort from './TableSort';

// T is a generic type that extends an object with an id property
const GenericTable = <T extends { id: string }>({
  columns,
  actions,
  formComponent: CreateForm,
  disabledActions = {},
  queryHook,
  filterOptions,
  requireDeleteConfirmation,
}: GenericTableProps<T>) => {
  const defaultSortColumn = columns.find(
    (column) => column.isDefaultSort,
  )?.header;

  let { data, pagination, state, sort, search, filters } = useGenericTableData({
    useQueryHook: queryHook,
    filterOptions,
    defaultSortColumn,
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

  const tableBody = useMemo(() => {
    if (state.isFetching) {
      return <SkeletonTable rows={pagination.pageSize} variant='body' />;
    }

    if (data.length === 0 || state.isError) {
      return (
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
    }

    return (
      <TableBody>
        {data.map((cell) => (
          <TableRow className='p-0' key={cell.id}>
            {columns.map((column) => (
              <TableCell key={column.key.toString()} className='py-1'>
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
                      fieldErrors[String(column.key)] ? 'border-red-500' : '',
                    )}
                  />
                ) : (
                  String(cell[column.key])
                )}
              </TableCell>
            ))}
            <TableCell className='min-w-40 py-1'>
              <ActionCell
                requireDeleteConfirmation={requireDeleteConfirmation}
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
        ))}
      </TableBody>
    );
  }, [
    data,
    state.isFetching,
    state.isError,
    columns,
    editingRow,
    editedValues,
    fieldErrors,
    deletingRow,
    isDeleting,
    isSaving,
    pagination.pageSize,
    handleCellValueChange,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
    disabledActions,
  ]);

  const tableHeader = useMemo(
    () => (
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header} className='text-blue-500'>
              <TableSort
                columnKey={String(column.key)}
                columnHeader={column.header}
                sortConfig={sort.sortConfig}
                onSort={sort.onSort}
                sortable={column.sortable}
              />
            </TableHead>
          ))}
          <TableHead className='w-4 text-blue-500'>Action</TableHead>
        </TableRow>
      </TableHeader>
    ),
    [columns, sort.sortConfig, sort.onSort],
  );

  const renderFilters = useMemo(
    () =>
      filterOptions.map((filterOption) => {
        switch (filterOption.type) {
          case 'enum':
            return (
              <EnumFilter
                key={filterOption.id}
                onChange={(value) => filters.onChange(filterOption.id, value)}
                {...filterOption}
              />
            );
          case 'range':
            return (
              <RangeFilter
                key={filterOption.id}
                value={filters.value[filterOption.id] as [number, number]}
                onChange={(value) => filters.onChange(filterOption.id, value)}
                {...filterOption}
              />
            );
          default:
            return null;
        }
      }),
    [filterOptions, filters.onChange, filters.value],
  );

  if (state.isLoading) {
    return <SkeletonTable rows={10} />;
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

        {renderFilters}

        <div className='flex-grow' />
        <div />
      </div>

      <Table>
        {tableHeader}

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
