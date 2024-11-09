import GenericTable, { Column } from '@/components/admin/GenericTable';
import useStudents from '@/hooks/useStudentApi';
import Student from '@/types/student';
import React from 'react';

const AdminStudentPage: React.FC = () => {
  let { data, isLoading, isError } = useStudents();

  const columns: Column<Student>[] = [
    {
      header: 'Full Name',
      key: 'fullname',
    },
    {
      header: 'Email',
      key: 'email',
    },
    {
      header: 'Date of Birth',
      key: 'dob',
    },
  ];

  const actions = {
    edit: (id: number | string) => {
      console.log('Edit student', id);
    },
    delete: (id: number | string) => {
      console.log('Delete student', id);
    },
    add: () => {
      console.log('Add student');
    },
  };

  return (
    <div className='min-h-3/4 m-auto w-3/4 border-l-2 border-r-2'>
      <h2 className='px-4 py-2 font-semibold'>Student List</h2>
      <GenericTable
        data={data}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default AdminStudentPage;
