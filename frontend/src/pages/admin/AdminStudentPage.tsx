import GenericTable, { Column } from '@/components/admin/GenericTable';
import SkeletonTable from '@/components/admin/SkeletonTable';
import useStudents from '@/hooks/useStudentApi';
import Student from '@/types/student';
import React from 'react';

const AdminStudentPage: React.FC = () => {
  let { data, isLoading } = useStudents();

  if (isLoading) {
    return (
      <div className='min-h-3/4 m-auto w-3/4 border-l-2 border-r-2'>
        <h2 className='px-4 py-2 font-semibold'>Student List</h2>
        <SkeletonTable rows={10} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className='min-h-3/4 m-auto w-3/4 border-l-2 border-r-2'>
        <h2 className='px-4 py-2 font-semibold'>Student List</h2>
        <div> Something wrong! </div>
      </div>
    );
  }

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

  return (
    <div className='min-h-3/4 m-auto w-3/4 border-l-2 border-r-2'>
      <h2 className='px-4 py-2 font-semibold'>Student List</h2>
      <GenericTable data={data} columns={columns} />;
    </div>
  );
};

export default AdminStudentPage;
