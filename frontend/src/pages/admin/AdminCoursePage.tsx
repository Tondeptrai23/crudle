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
import { EnrollmentsDialog } from './EnrollmentsDialog';
import { useNavigate } from 'react-router-dom';

const AdminCoursePage: React.FC = () => {
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const navigate = useNavigate();
  const [enrollmentsOpen, setEnrollmentsOpen] = useState(false);

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

  const enrollmentsOption: AdditionalAction = {
    label: 'Enrollments',
    handler: (index) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      navigate(`/admin/courses/${index}/enrollments`);
    },
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
