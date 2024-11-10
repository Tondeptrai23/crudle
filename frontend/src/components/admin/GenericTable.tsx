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
import { EllipsisVertical, PlusCircle } from 'lucide-react';
import { Input } from '../common/ui/input';
import LoadingButton from './LoadingButton';
import SkeletonTable from './SkeletonTable';

export interface Column<T> {
  header: string;
  key: keyof T;
}

interface GenericTableProps<T> {
  data?: T[];
  columns: Column<T>[];
  state: TableState;
  actions?: {
    edit: (id: string | number) => void | Promise<void>;
    delete: (id: string | number) => void | Promise<void>;
    add: () => void | Promise<void>;
  };
}

interface TableState {
  isLoading?: boolean;
  isError?: boolean;
  isAdding?: boolean;
}

// T is a generic type that extends an object with an id property
const GenericTable = <T extends { id: string | number }>({
  data = [],
  columns,
  state: { isLoading = false, isError = false, isAdding = false },
  actions,
}: GenericTableProps<T>) => {
  if (isError) {
    return <div className='text-center text-red-500'>No data found</div>;
  }

  if (isLoading) {
    return <SkeletonTable rows={10} />;
  }

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
                <TableHead className='text-blue-500'>{column.header}</TableHead>
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
                      {String(cell[column.key])}
                      {/* "key" can be anything that is
                    a key of T, we need to convert it to string that react can render */}
                    </TableCell>
                  );
                })}
                <TableCell className='py-1'>
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
                          actions?.edit(cell.id);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          actions?.delete(cell.id);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
