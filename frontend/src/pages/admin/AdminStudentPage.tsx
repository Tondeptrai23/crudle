import GenericTable from '@/components/admin/GenericTable';
import AddStudentForm, {
  StudentFormSchema,
} from '@/components/common/forms/AddStudentForm';

import {
  useCreateStudent,
  useStudents,
  useUpdateStudent,
} from '@/hooks/api/useStudentApi';
import { DateRangeFilterOption, SearchFilterOption } from '@/types/filter';
import Student, { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import { Column } from '@/types/table';
import { Calendar, IdCard, User } from 'lucide-react';
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

  const dobFilterOption: DateRangeFilterOption = {
    id: 'dob',
    label: 'Date of Birth',
    labelIcon: Calendar,
    minDate: new Date('1990-01-01'),
    maxDate: new Date('2010-12-31'),
    type: 'date',
  };

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

  return (
    <div className='min-h-3/4 w m-auto flex flex-row gap-4'>
      <GenericTable
        tableTitle='Student'
        queryHook={useStudents}
        columns={columns}
        actions={actions}
        formComponent={AddStudentForm}
        disabledActions={{
          edit: false,
          delete: true,
        }}
        filterOptions={[
          dobFilterOption,
          searchIdFilterOption,
          searchNameFilterOption,
        ]}
      />
    </div>
  );
};

export default AdminStudentPage;
