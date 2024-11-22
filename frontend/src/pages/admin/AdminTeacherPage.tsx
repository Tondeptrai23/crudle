import GenericTable from '@/components/admin/GenericTable';
import AddTeacherForm, {
  TeacherFormSchema,
} from '@/components/common/forms/AddTeacherForm';

import {
  useCreateTeacher,
  useDeleteTeacher,
  useTeachers,
  useUpdateTeacher,
} from '@/hooks/api/useTeacherApi';
import { Column } from '@/types/table';
import Teacher, { CreateTeacherDTO, UpdateTeacherDTO } from '@/types/teacher';
import React from 'react';

const AdminTeacherPage: React.FC = () => {
  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();
  const deleteTeacher = useDeleteTeacher();

  const columns: Column<Teacher>[] = React.useMemo(
    () => [
      {
        header: 'Full Name',
        key: 'fullname',
        editable: true,
        validate: (value: string) => {
          const result = TeacherFormSchema.shape.fullname.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Contact Email',
        key: 'contactEmail',
        editable: true,
        validate: (value: string) => {
          const result = TeacherFormSchema.shape.contactEmail.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Contact Phone',
        key: 'contactPhone',
        editable: true,
        validate: (value: string) => {
          const result = TeacherFormSchema.shape.contactPhone.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
    ],
    [],
  );

  const actions = React.useMemo(
    () => ({
      onSave: async (id: string, value: UpdateTeacherDTO) => {
        await updateTeacher.mutateAsync({ id, data: value });
      },
      onDelete: async (id: string) => {
        await deleteTeacher.mutateAsync(id);
      },
      onAdd: async (value: CreateTeacherDTO) => {
        await createTeacher.mutateAsync(value);
      },
    }),
    [updateTeacher, deleteTeacher, createTeacher],
  );

  return (
    <div className='min-h-3/4 w m-auto flex flex-row gap-4'>
      <GenericTable
        tableTitle='Teacher'
        queryHook={useTeachers}
        columns={columns}
        actions={actions}
        formComponent={AddTeacherForm}
        disabledActions={{
          edit: false,
          delete: false,
        }}
        filterOptions={[]}
      />
    </div>
  );
};

export default AdminTeacherPage;
