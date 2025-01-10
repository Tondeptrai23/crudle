import React from 'react';
import { useParams } from 'react-router-dom';
import { Column } from '@/types/table';
import { Student } from '@/types/student';
import { Teacher } from '@/types/teacher';
import { useStudents } from '@/hooks/api/useStudentApi';
import { useTeachers } from '@/hooks/api/useTeacherApi';
import { SearchFilterOption } from '@/types/filter';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table';
import { Checkbox } from '@/components/common/ui/checkbox';
import { useEnrollStudents } from '@/hooks/api/useCourseApi';

const AdminCourseEnrollmentPage: React.FC = () => {
  const { courseId } = useParams();
  const [selectedTeacher, setSelectedTeacher] = React.useState<Teacher | null>(
    null,
  );
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);

  const enrollStudents = useEnrollStudents();
  //   const { data: teachers } = useTeachers({
  //     page: 1,
  //     pageSize: 20,
  //     filters: {},
  //   });
  const teachers = [
    { id: '1', name: 'Teacher 1' },
    { id: '2', name: 'Teacher 2' },
  ];

  const { data: students, isLoading } = useStudents({
    page: 1,
    pageSize: 20,
    filters: {},
  });

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }
      return [...prev, studentId];
    });
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students?.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students?.map((s) => s.id) ?? []);
    }
  };

  const columns: Column<Student>[] = React.useMemo(
    () => [
      {
        header: '',
        key: 'select',
        type: 'checkbox',
        style: { width: '40px' },
      },
      {
        header: 'Student ID',
        key: 'studentId',
        sortable: true,
        style: { width: '120px' },
      },
      {
        header: 'Name',
        key: 'name',
        sortable: true,
        style: { minWidth: '200px' },
      },
    ],
    [],
  );

  const handleSubmit = async () => {
    if (!courseId) return;
    await enrollStudents.mutateAsync({
      courseId,
      studentIds: selectedStudents,
      teacherId: selectedTeacher?.id,
    });
  };

  const idFilter: SearchFilterOption = {
    id: 'studentId',
    label: 'Student ID',
    labelIcon: Search,
    type: 'search',
  };

  const nameFilter: SearchFilterOption = {
    id: 'name',
    label: 'Name',
    labelIcon: Search,
    type: 'search',
  };

  return (
    <div className='space-y-4 p-4'>
      <div className='flex items-center gap-4'>
        <Select
          value={selectedTeacher?.id}
          onValueChange={(value) => {
            const teacher = teachers?.find((t) => t.id === value);
            setSelectedTeacher(teacher ?? null);
          }}
        >
          <SelectTrigger className='w-[280px]'>
            <SelectValue placeholder='Select teacher...' />
          </SelectTrigger>
          <SelectContent>
            {teachers?.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id}>
                {teacher.id} - {teacher.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={handleSubmit}
          disabled={!selectedTeacher || selectedStudents.length === 0}
        >
          Save Changes
        </button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>
                <Checkbox
                  checked={selectedStudents.length === students?.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => handleSelectStudent(student.id)}
                  />
                </TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCourseEnrollmentPage;
