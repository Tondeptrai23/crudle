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
  let { data, isLoading, isError } = useStudents();
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const columns: Column<Student>[] = [
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
  ];

  const actions = {
    onSave: async (id: string, value: UpdateStudentDTO) => {
      await updateStudent.mutateAsync({ id, data: value });
    },
    onDelete: async (id: string) => {
      await deleteStudent.mutateAsync(id);
    },
    onAdd: async (value: CreateStudentDTO) => {
      await createStudent.mutateAsync(value);
    },
  };

  return (
    <div className='min-h-3/4 m-auto w-3/4 border-l-2 border-r-2'>
      <h2 className='px-4 py-2 font-semibold'>Student List</h2>
      <GenericTable
        data={data}
        columns={columns}
        actions={actions}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          pageSize: 10,
          onPageChange: () => {},
          onPageSizeChange: () => {},
        }}
        state={{ isLoading, isError }}
        formComponent={AddStudentForm}
      />
    </div>
  );
};

export default AdminStudentPage;
