import AddExamForm from '@/components/exams/AddExamForm';
import {
  useCanModifyExam,
  useGetExam,
  useUpdateExam,
} from '@/hooks/api/useExamApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { CreateExamDto } from '@/types/exam';
import { useCustomParams } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const EditExamPage = () => {
  const { courseId, examId } = useCustomParams();
  const updateExam = useUpdateExam();
  const navigate = useNavigate();
  const { role } = useAuth();
  const { toast } = useToast();

  const { data: exam, isLoading } = useGetExam(courseId, examId, role);

  const handleSave = async (formData: CreateExamDto) => {
    if (!exam) return;

    const canModify = useCanModifyExam(exam);
    if (!canModify) {
      toast({
        title: 'Error',
        description: 'Cannot edit an exam that has already started',
        variant: 'destructive',
      });
      return;
    }

    await updateExam.mutateAsync({ examId, exam: formData });
    navigate(`/course/${courseId}/exam/${examId}`);
  };

  if (isLoading || !exam) {
    return null;
  }

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>Edit Exam</h1>
      <AddExamForm
        initialData={exam}
        onSave={handleSave}
        onCancel={() => navigate(-1)}
        isEdit
      />
    </div>
  );
};

export default EditExamPage;
