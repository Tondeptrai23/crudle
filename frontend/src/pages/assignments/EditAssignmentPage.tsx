import AddAssignmentForm from '@/components/assignments/AddAssignmentForm';
import {
  useGetAssignment,
  useUpdateAssignment,
} from '@/hooks/api/useAssignmentApi';
import { CreateAssignmentDto } from '@/types/assignment';
import { UrlExtractor } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const EditAssignmentPage = () => {
  const courseId = UrlExtractor.extractCourseId();
  const assignmentId = UrlExtractor.extractAssignmentId();

  const updateAssignment = useUpdateAssignment();
  const navigate = useNavigate();

  const handleSave = async (formData: CreateAssignmentDto) => {
    await updateAssignment.mutateAsync({ assignmentId, assignment: formData });

    navigate(`/course/${courseId}/assignment`);
  };

  const { data: assignment } = useGetAssignment(courseId, assignmentId);

  if (!assignment) {
    return null;
  }

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>
        Object Oriented Programming - Edit Assignment
      </h1>
      <AddAssignmentForm
        initialData={assignment}
        onSave={handleSave}
        onCancel={() => navigate('..', { relative: 'path' })}
      />
    </div>
  );
};

export default EditAssignmentPage;
