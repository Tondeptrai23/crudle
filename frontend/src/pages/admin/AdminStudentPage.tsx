import GenericTable from '@/components/admin/GenericTable';
import AddStudentForm, {
  StudentFormSchema,
} from '@/components/common/forms/AddStudentForm';

import {
  useCreateStudent,
  useDeleteStudent,
  useStudents,
  useUpdateStudent,
} from '@/hooks/useStudentApi';
import Student, { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import { Column } from '@/types/table';
import React from 'react';

const AdminStudentPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');
  let { data, isLoading, isError, isFetching } = useStudents(
    page,
    pageSize,
    searchQuery,
  );
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const columns: Column<Student>[] = React.useMemo(
    () => [
      {
        header: 'Full Name',
        key: 'fullname',
        editable: true,
        validate: (value: string) => {
          const result = StudentFormSchema.shape.fullname.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Email',
        key: 'email',
        editable: false,
      },
      {
        header: 'Date of Birth',
        key: 'dob',
        editable: true,
        validate: (value: string) => {
          const result = StudentFormSchema.shape.dob.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
    ],
    [],
  );
  const actions = React.useMemo(
    () => ({
      onSave: async (id: string, value: UpdateStudentDTO) => {
        await updateStudent.mutateAsync({ id, data: value });
      },
      onDelete: async (id: string) => {
        await deleteStudent.mutateAsync(id);
      },
      onAdd: async (value: CreateStudentDTO) => {
        await createStudent.mutateAsync(value);
      },
      onSearch: (value: string) => {
        setSearchQuery(value);
        setPage(1);
      },
    }),
    [updateStudent, deleteStudent, createStudent],
  );

  if (!data) {
    data = {
      currentPage: 1,
      students: [],
      totalPages: 0,
      totalItems: 0,
    };
  }

  return (
    <div className='min-h-3/4 m-auto w-3/4 rounded-md border-2'>
      <h2 className='px-4 py-4 text-2xl font-semibold'>Student List</h2>
      <GenericTable
        data={data.students}
        columns={columns}
        actions={actions}
        pagination={{
          currentPage: page,
          totalPages: data.totalPages,
          totalItems: data.totalItems,
          pageSize: pageSize,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
        }}
        state={{ isLoading, isError, isFetching }}
        formComponent={AddStudentForm}
        disabledActions={{
          edit: false,
          delete: true,
        }}
      />
    </div>
  );
};

export default AdminStudentPage;
