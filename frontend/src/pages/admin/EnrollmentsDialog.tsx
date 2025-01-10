import { Button } from "@/components/common/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/common/ui/dialog";
import { SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/common/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/common/ui/table";
import { Select, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Plus } from "lucide-react";
import { useState } from "react";

export const EnrollmentsDialog = ({ open, onOpenChange }) => {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const teachers = [
    { id: '1', fullname: 'John Doe' },
    { id: '2', fullname: 'Jane Smith' },
    { id: '3', fullname: 'Robert Johnson' },
  ];

  const students = [
    { id: 'ST001', fullname: 'Alice Brown' },
    { id: 'ST002', fullname: 'Bob Wilson' },
    { id: 'ST003', fullname: 'Carol White' },
    { id: 'ST004', fullname: 'David Black' },
  ];

  const filteredStudents = students.filter((student) =>
    student.fullname.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
<Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='min-w-[800px]'>
          <DialogHeader>
            <DialogTitle>Course Enrollments</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-4'>
            {/* Teacher Selection */}
            <div className='flex flex-col gap-2'>
              <label>Teacher</label>
              <Select
                value={selectedTeacher}
                onValueChange={setSelectedTeacher}
                disabled={isLoadingTeachers}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a teacher' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Teachers</SelectLabel>
                    {teachers?.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.fullname}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Students Table */}
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold'>Students</h3>
                <Button size='sm'>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Student
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.fullname}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm">Remove</Button>
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  );
};
