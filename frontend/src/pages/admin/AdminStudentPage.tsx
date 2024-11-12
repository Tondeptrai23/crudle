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
import { FilterOption } from '@/types/filter';
import Student, { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import { Column } from '@/types/table';
import { Bell, Filter, Heart, Mail, Settings, Star, User } from 'lucide-react';
import React from 'react';

const AdminStudentPage: React.FC = () => {
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
    }),
    [updateStudent, deleteStudent, createStudent],
  );

  const filterOption: FilterOption = {
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'messages', label: 'Messages', icon: Mail },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'favorites', label: 'Favorites', icon: Star },
      { id: 'likes', label: 'Likes', icon: Heart },
    ],
    onChange: (ids) => {
      console.log(ids);
    },
    label: 'Filter',
    labelIcon: Filter,
  };

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
        filterOption={filterOption}
      />
    </div>
  );
};

export default AdminStudentPage;
