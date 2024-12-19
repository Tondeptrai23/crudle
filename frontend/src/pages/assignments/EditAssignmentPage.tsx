import AddAssignmentForm from '@/components/assignments/AddAssignmentForm';
import {
  useGetAssignment,
  useUpdateAssignment,
} from '@/hooks/api/useAssignmentApi';
import useAuth from '@/hooks/useAuth';
import { CreateAssignmentDto } from '@/types/assignment';
import { useCustomParams } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const EditAssignmentPage = () => {
  const { courseId, assignmentId } = useCustomParams();

  const updateAssignment = useUpdateAssignment();
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleSave = async (formData: CreateAssignmentDto) => {
    await updateAssignment.mutateAsync({ assignmentId, assignment: formData });

    navigate(`/course/${courseId}/assignment/${assignmentId}`);
  };

  const { data: assignment } = useGetAssignment(courseId, assignmentId, role);

  if (!assignment) {
    return null;
  }

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Edit Assignment</h1>
      <AddAssignmentForm
        initialData={assignment}
        onSave={handleSave}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default EditAssignmentPage;
