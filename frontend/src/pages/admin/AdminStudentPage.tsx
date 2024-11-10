import GenericTable, { Column } from '@/components/admin/GenericTable';
import AddStudentForm from '@/components/common/forms/AddStudentForm';
import { Dialog, DialogContent } from '@/components/common/ui/dialog';
import { useCreateStudent, useStudents } from '@/hooks/useStudentApi';
import Student, { CreateStudentDTO } from '@/types/student';
import React from 'react';

const AdminStudentPage: React.FC = () => {
  let { data, isLoading, isError } = useStudents();
  const [isAdding, setIsAdding] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const createStudent = useCreateStudent();

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
      setIsAdding(true);
      setDialogOpen(true);
    },
  };

  const handleSubmit = async (value: CreateStudentDTO) => {
    setDialogOpen(false);
    await createStudent.mutateAsync(value);
    setIsAdding(false);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open && !createStudent.isLoading) {
      setIsAdding(false);
    }
  };

  return (
    <div className='min-h-3/4 m-auto w-3/4 border-l-2 border-r-2'>
      <h2 className='px-4 py-2 font-semibold'>Student List</h2>
      <GenericTable
        data={data}
        columns={columns}
        actions={actions}
        state={{ isLoading, isError, isAdding }}
      />

      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          <AddStudentForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudentPage;
