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
import { EllipsisVertical } from 'lucide-react';

export interface Column<T> {
  header: string;
  key: keyof T;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

// T is a generic type that extends an object with an id property
const GenericTable = <T extends { id: string | number }>({
  data,
  columns,
}: GenericTableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((columns) => {
            return (
              <TableHead className='text-blue-500'>{columns.header}</TableHead>
            );
          })}
          <TableHead className='w-4 text-blue-500'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cell, index) => {
          return (
            <TableRow className='p-0' key={index}>
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GenericTable;
