import GenericTable, { Column } from '@/components/admin/GenericTable';
import AddStudentForm from '@/components/common/forms/AddStudentForm';
import { Dialog, DialogContent } from '@/components/common/ui/dialog';
import {
  useCreateStudent,
  useStudents,
  useUpdateStudent,
} from '@/hooks/useStudentApi';
import Student, { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';
import React from 'react';

const AdminStudentPage: React.FC = () => {
  let { data, isLoading, isError } = useStudents();
  const [isAdding, setIsAdding] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();

  const columns: Column<Student>[] = [
    {
      header: 'Full Name',
      key: 'fullname',
      editable: true,
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
    },
  ];

  const actions = {
    save: async (id: number | string, value: UpdateStudentDTO) => {
      setIsSaving(true);
      await updateStudent.mutateAsync({ id, data: value });
      setIsSaving(false);
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
        state={{ isLoading, isError, isAdding, isSaving }}
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
