import GenericTable from '@/components/admin/GenericTable';
import AddCourseForm, {
  CourseFormSchema,
} from '@/components/common/forms/AddCourseForm';
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
} from '@/hooks/api/useCourseApi';
import Course, { CreateCourseDTO, UpdateCourseDTO } from '@/types/course';
import { DateRangeFilterOption, SearchFilterOption } from '@/types/filter';
import { Column } from '@/types/table';
import { Calendar, Search } from 'lucide-react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/common/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/common/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/common/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';
import { Plus } from 'lucide-react';
import { useTeachers } from '@/hooks/api/useTeacherApi';
import { useStudents } from '@/hooks/api/useStudentApi';
import { AdditionalAction } from '@/types/table';

const AdminCoursePage: React.FC = () => {
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  const columns: Column<Course>[] = React.useMemo(
    () => [
      {
        header: 'Code',
        key: 'code',
        editable: false,
        sortable: true,
        isDefaultSort: true,
        style: {
          width: '120px',
        },
        validate: (value: string) => {
          const result = CourseFormSchema.shape.code.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Name',
        key: 'name',
        editable: true,
        sortable: true,
        style: {
          minWidth: '150px',
          maxWidth: '300px',
        },
        validate: (value: string) => {
          const result = CourseFormSchema.shape.name.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Description',
        key: 'description',
        editable: true,
        sortable: false,
        style: {
          minWidth: '200px',
        },
        validate: (value: string) => {
          const result = CourseFormSchema.shape.description.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Start Date',
        key: 'startDate',
        sortable: true,
        editable: false,
        style: {
          width: '150px',
        },
        validate: (value: string) => {
          const result = CourseFormSchema.shape.startDate.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Teacher',
        key: 'teacherName',
        sortable: false,
        editable: false,
        style: {
          width: '150px',
        },
      },
    ],
    [],
  );

  const actions = React.useMemo(
    () => ({
      onSave: async (id: string, value: UpdateCourseDTO) => {
        await updateCourse.mutateAsync({ id, data: value });
      },

      onAdd: async (value: CreateCourseDTO) => {
        await createCourse.mutateAsync(value);
      },
    }),
    [],
  );

  const nameFilter: SearchFilterOption = {
    id: 'name',
    label: 'Name',
    labelIcon: Search,
    type: 'search',
  };

  const codeFilter: SearchFilterOption = {
    id: 'code',
    label: 'Code',
    labelIcon: Search,
    type: 'search',
  };

  const startDateFilter: DateRangeFilterOption = {
    id: 'startDate',
    label: 'Start Date',
    labelIcon: Calendar,
    minDate: new Date(2020, 0, 1),
    maxDate: new Date(),
    type: 'date',
  };

  const teacherNameFilter: SearchFilterOption = {
    id: 'teacherName',
    label: 'Teacher',
    labelIcon: Search,
    type: 'search',
  };

  const showEnrollments = () => {
    const [open, setOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const { data: teachers, isLoading: isLoadingTeachers } = useTeachers({
      page: 1,
      pageSize: 999, // TODO: Fix
      filters: {
        id: '',
        fullname: '',
        contactEmail: [],
        phone: '',
      },
      sort: {
        key: null,
        direction: null,
      },
    });

    const { data: students, isLoadingStudents } = useStudents({
      page: 1,
      pageSize: 999, // TODO: Fix
      filters: {
        id: '',
        fullname: '',
        contactEmail: [],
        phone: '',
      },
      sort: {
        key: null,
        direction: null,
      },
    });

    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
                    {teachers?.data.map((teacher) => (
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
  };

  const enrollmentsOption: AdditionalAction = {
    label: 'Enrollments',
    handler: showEnrollments,
  };

  return (
    <div className='min-h-3/4 w m-auto flex flex-row gap-4'>
      <GenericTable
        tableTitle='Course'
        queryHook={useCourses}
        columns={columns}
        actions={actions}
        formComponent={AddCourseForm}
        disabledActions={{
          edit: false,
          delete: true,
        }}
        filterOptions={[
          nameFilter,
          codeFilter,
          startDateFilter,
          teacherNameFilter,
        ]}
        additionalActions={[enrollmentsOption]}
      />
    </div>
  );
};

export default AdminCoursePage;
