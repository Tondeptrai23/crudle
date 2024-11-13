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

/// This component is used to show usage of GenericTable component
/// TODO: Delete this component later
const AdminStudentPageWithNoFilter: React.FC = () => {
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const columns: Column<Student>[] = React.useMemo(
    () => [
      {
        header: 'Full Name',
        key: 'fullname',
        editable: true,
        isDefaultSort: true,
        sortable: true,
        style: {
          maxWidth: '200px',
        },
        validate: (value: string) => {
          const result = StudentFormSchema.shape.fullname.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Email',
        key: 'email',
        style: {
          minWidth: '200px',
        },
        sortable: false,
        editable: false,
      },
      {
        header: 'Date of Birth',
        key: 'dob',
        sortable: true,
        editable: true,
        style: {
          width: '150px',
        },
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
    }),
    [updateStudent, deleteStudent, createStudent],
  );

  return (
    <div className='min-h-3/4 m-auto w-3/4 rounded-md border-2'>
      <h2 className='px-4 py-4 text-2xl font-semibold'>Student List</h2>
      <GenericTable
        queryHook={useStudents}
        columns={columns}
        actions={actions}
        formComponent={AddStudentForm}
        disabledActions={{
          edit: false,
          delete: true,
        }}
        filterOptions={[]}
      />
    </div>
  );
};

export default AdminStudentPageWithNoFilter;
