import GenericTable, { Column } from '@/components/admin/GenericTable';
import Student from '@/types/student';
import React, { useState } from 'react';

const AdminStudentPage: React.FC = () => {
  let [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      fullname: 'John Doe',
      email: 'test@gmail.com',
      dob: '1990-01-01',
    },
    {
      id: 2,
      fullname: 'Jane Doe',
      email: 'test2@gmail.com',
      dob: '1991-01-01',
    },
  ]);

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
      <GenericTable data={students} columns={columns} />
    </div>
  );
};

export default AdminStudentPage;
