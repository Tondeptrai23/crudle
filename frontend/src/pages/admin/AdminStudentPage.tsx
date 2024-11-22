import GenericTable from '@/components/admin/GenericTable';
import AddStudentForm, {
  StudentFormSchema,
} from '@/components/common/forms/AddStudentForm';

import {
  useCreateStudent,
  useStudentsWithFilters,
  useUpdateStudent,
} from '@/hooks/api/useStudentApi';
import {
  DateRangeFilterOption,
  EnumFilterOption,
  RangeFilterOption,
  SearchFilterOption,
} from '@/types/filter';
import Student, { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import { Column } from '@/types/table';
import { Bell, Calendar, Heart, Mail, Settings } from 'lucide-react';
import React from 'react';

const AdminStudentPage: React.FC = () => {
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();

  const columns: Column<Student>[] = React.useMemo(
    () => [
      {
        header: 'ID',
        key: 'id',
        editable: false,
        sortable: true,
        style: {
          width: '100px',
        },
      },
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
      onAdd: async (value: CreateStudentDTO) => {
        await createStudent.mutateAsync(value);
      },
    }),
    [updateStudent, createStudent],
  );

  const filterOption: EnumFilterOption = {
    id: 'email',
    type: 'enum',
    items: [
      { id: 'outlook', label: 'Outlook', icon: Settings },
      { id: 'gmail', label: 'Gmail', icon: Bell },
      { id: 'facebook', label: 'Facebook', icon: Heart },
    ],
    label: 'Email',
    labelIcon: Mail,
  };

  const rangeFilterOption: RangeFilterOption = {
    id: 'dob',
    label: 'Birth Year',
    labelIcon: Calendar,
    type: 'range',
    step: 1,
    min: 1990,
    max: 2005,
  };

  const dateRangeFilterOption: DateRangeFilterOption = {
    id: 'dob2',
    label: 'Date of Birth',
    labelIcon: Calendar,
    minDate: new Date('1990-01-01'),
    maxDate: new Date('2005-12-31'),
    type: 'date',
  };

  const searchFilterOption: SearchFilterOption = {
    id: 'fullname',
    label: 'Full Name',
    labelIcon: Mail,
    type: 'search',
  };

  return (
    <div className='min-h-3/4 w m-auto flex flex-row gap-4'>
      <GenericTable
        tableTitle='Student'
        queryHook={useStudentsWithFilters}
        columns={columns}
        actions={actions}
        formComponent={AddStudentForm}
        disabledActions={{
          edit: false,
          delete: true,
        }}
        filterOptions={[
          filterOption,
          rangeFilterOption,
          dateRangeFilterOption,
          searchFilterOption,
        ]}
      />
    </div>
  );
};

export default AdminStudentPage;
