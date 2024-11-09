import GenericTable, { Column } from '@/components/admin/GenericTable';
import React, { useState } from 'react';

import Teacher from '@/types/teacher';

const AdminTeacherPage: React.FC = () => {
  let [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      fullname: 'John Doe',
      contactEmail: 'teacher@gmail.com',
      contactPhone: '123-456-7890',
    },
    {
      id: 2,
      fullname: 'Jane Doe',
      contactEmail: 'teacher2@gmail.com',
      contactPhone: '123-456-7891',
    },
  ]);

  const columns: Column<Teacher>[] = [
    {
      header: 'ID',
      key: 'id',
    },
    {
      header: 'Full Name',
      key: 'fullname',
    },
    {
      header: 'Email',
      key: 'contactEmail',
    },
    {
      header: 'Phone',
      key: 'contactPhone',
    },
  ];

  return (
    <div className='min-h-3/4 m-auto w-3/4 border-l-2 border-r-2'>
      <h2 className='px-4 py-2 font-semibold'>Teacher List</h2>
      <GenericTable data={teachers} columns={columns} />
    </div>
  );
};

export default AdminTeacherPage;
