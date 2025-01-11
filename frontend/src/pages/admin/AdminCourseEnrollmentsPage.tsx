import { Checkbox } from '@/components/common/ui/checkbox';
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
import { useCourseDetail, useEnrollStudents } from '@/hooks/api/useCourseApi';
import { useStudents } from '@/hooks/api/useStudentApi';
import { useTeachers } from '@/hooks/api/useTeacherApi';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/types/enums';
import { SearchFilterOption } from '@/types/filter';
import Student from '@/types/student';
import { Column } from '@/types/table';
import Teacher from '@/types/teacher';
import { Search } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminCourseEnrollmentPage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTeacher, setSelectedTeacher] = React.useState<Teacher | null>(
    null,
  );
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);
  const { data: course } = useCourseDetail(Role.Admin, courseId ?? '');
  const enrollStudents = useEnrollStudents();
  const { data: teachers } = useTeachers({
    page: 1,
    pageSize: 20,
    filters: {},
    sort: {
      key: 'teacherId',
      direction: 'asc',
    },
  });

  const { data: students, isLoading } = useStudents({
    page: 1,
    pageSize: 20,
    filters: {},
    sort: {
      key: 'studentId',
      direction: 'asc',
    },
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
    if (selectedStudents.length === students?.data.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students?.data.map((s) => s.id) ?? []);
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

  const handleSaveChanges = async () => {
    try {
      await enrollStudents.mutateAsync({
        courseId,
        studentIds: selectedStudents,
        teacherId: selectedTeacher?.id,
      });

      toast({
        title: 'Success',
        description: 'Successfully updated enrollments',
      });

      navigate('/admin/course');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to update enrollments: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='mx-auto max-w-4xl space-y-4 p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>
          Course: {course?.code} - {course?.name}
        </h1>
      </div>
      <div className='flex items-center gap-4'>
        <div>Teacher: </div>
        <Select
          value={selectedTeacher?.id}
          onValueChange={(value) => {
            const teacher = teachers?.data.find((t) => t.id === value);
            setSelectedTeacher(teacher ?? null);
          }}
        >
          <SelectTrigger className='w-[280px]'>
            <SelectValue placeholder='Select teacher...' />
          </SelectTrigger>
          <SelectContent>
            {teachers?.data.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id}>
                {teacher.id} - {teacher.fullname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          className='rounded bg-primary px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50'
          onClick={handleSaveChanges}
          disabled={
            enrollStudents.isPending ||
            !selectedTeacher ||
            selectedStudents.length === 0
          }
        >
          {enrollStudents.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>
                <Checkbox
                  checked={selectedStudents.length === students?.data.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.data.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => handleSelectStudent(student.id)}
                  />
                </TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.fullname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCourseEnrollmentPage;
