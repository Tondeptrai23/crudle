import AddExamForm from '@/components/exams/AddExamForm';
import { useCreateExam } from '@/hooks/api/useExamApi';
import { CreateExamDto } from '@/types/exam';
import { useCustomParams } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const AddExamPage = () => {
  const { courseId } = useCustomParams();
  const createExam = useCreateExam();
  const navigate = useNavigate();

  const handleSave = async (formData: CreateExamDto) => {
    await createExam.mutateAsync(formData);
    navigate(`/course/${courseId}?tab=exams`);
  };

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Add Exam</h1>
      <AddExamForm
        initialData={{
          courseId: courseId,
          name: '',
          content: '',
          duration: 60,
          startDate: new Date(),
        }}
        onSave={handleSave}
        onCancel={() => navigate('..?tab=exams', { relative: 'path' })}
      />
    </div>
  );
};

export default AddExamPage;
