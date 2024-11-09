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
import Student from '@/types/student';
import { EllipsisVertical } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  columns: { header: string; key: string }[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students, columns }) => {
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
        {students.map((student) => {
          return (
            <TableRow className='p-0' key={student.id}>
              {columns.map((column) => {
                return (
                  <TableCell className='py-1'>
                    {student[column.key as keyof Student]}
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

export default StudentTable;
