import GenericTable from '@/components/admin/GenericTable';
import AddCourseForm, {
  CourseFormSchema,
} from '@/components/common/forms/AddCourseForm';
import { useCourses } from '@/hooks/api/useCourseApi';
import Course from '@/types/course';
import { Column } from '@/types/table';
import React from 'react';

const AdminCoursePage: React.FC = () => {
  const columns: Column<Course>[] = React.useMemo(
    () => [
      {
        header: 'Code',
        key: 'code',
        editable: true,
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
          minWidth: '200px',
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
          minWidth: '300px',
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
        editable: true,
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

  const actions = React.useMemo(() => ({}), []);
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
        filterOptions={[]}
      />
    </div>
  );
};

export default AdminCoursePage;
