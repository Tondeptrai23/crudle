import AddAssignmentForm from '@/components/assignments/AddAssignmentForm';
import { useCreateAssignment } from '@/hooks/api/useAssignmentApi';
import { CreateAssignmentDto } from '@/types/assignment';
import { UrlExtractor } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const AddAssignmentPage = () => {
  const courseId = UrlExtractor.extractCourseId();

  const createAssignment = useCreateAssignment();
  const navigate = useNavigate();

  const handleSave = async (formData: CreateAssignmentDto) => {
    await createAssignment.mutateAsync(formData);

    navigate(`/course/${courseId}/assignment`);
  };

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>
        Object Oriented Programming - Add Assignment
      </h1>
      <AddAssignmentForm
        initialData={{
          courseId: courseId,
          name: '',
          content: '',
          duedAt: null,
          canViewScore: false,
          canRetry: false,
          type: 'questions',
        }}
        onSave={handleSave}
        onCancel={() => navigate('..', { relative: 'path' })}
      />
    </div>
  );
};

export default AddAssignmentPage;
