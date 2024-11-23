import GenericTable from '@/components/admin/GenericTable';
import AddTeacherForm, {
  TeacherFormSchema,
} from '@/components/common/forms/AddTeacherForm';

import {
  useCreateTeacher,
  useTeachers,
  useUpdateTeacher,
} from '@/hooks/api/useTeacherApi';
import { EnumFilterOption, SearchFilterOption } from '@/types/filter';
import { Column } from '@/types/table';
import Teacher, { CreateTeacherDTO, UpdateTeacherDTO } from '@/types/teacher';
import { Bell, Heart, IdCard, Mail, Settings, User } from 'lucide-react';
import React from 'react';

const AdminTeacherPage: React.FC = () => {
  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();

  const columns: Column<Teacher>[] = React.useMemo(
    () => [
      {
        header: 'ID',
        key: 'id',
        isDefaultSort: true,
        editable: false,
        sortable: true,
      },
      {
        header: 'Full Name',
        key: 'fullname',
        editable: true,
        sortable: true,
        validate: (value: string) => {
          const result = TeacherFormSchema.shape.fullname.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Contact Email',
        key: 'contactEmail',
        editable: true,
        sortable: false,
        validate: (value: string) => {
          const result = TeacherFormSchema.shape.contactEmail.safeParse(value);
          return result.success ? null : result.error.errors[0].message;
        },
      },
      {
        header: 'Contact Phone',
        key: 'contactPhone',
        editable: true,
        sortable: false,
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
      onAdd: async (value: CreateTeacherDTO) => {
        await createTeacher.mutateAsync(value);
      },
    }),
    [updateTeacher, createTeacher],
  );

  const searchIdFilterOption: SearchFilterOption = {
    id: 'id',
    label: 'ID',
    labelIcon: IdCard,
    type: 'search',
  };

  const searchNameFilterOption: SearchFilterOption = {
    id: 'fullname',
    label: 'Full Name',
    labelIcon: User,
    type: 'search',
  };

  const contactEmailDomainFilterOption: EnumFilterOption = {
    id: 'contactEmail',
    label: 'Contact Email',
    labelIcon: Mail,
    type: 'enum',
    items: [
      { id: 'outlook', label: 'Outlook', icon: Settings },
      { id: 'gmail', label: 'Gmail', icon: Bell },
      { id: 'facebook', label: 'Facebook', icon: Heart },
    ],
  };

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
          delete: true,
        }}
        filterOptions={[
          searchIdFilterOption,
          searchNameFilterOption,
          contactEmailDomainFilterOption,
        ]}
      />
    </div>
  );
};

export default AdminTeacherPage;
