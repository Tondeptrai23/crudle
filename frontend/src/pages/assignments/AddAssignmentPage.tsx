import AddAssignmentForm from '@/components/assignments/AddAssignmentForm';
import { useCreateAssignment } from '@/hooks/api/useAssignmentApi';
import { CreateAssignmentDto, CreateQuestionDto } from '@/types/assignment';
import { UrlExtractor } from '@/utils/helper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAssignmentPage = () => {
  const [questions, setQuestions] = useState<CreateQuestionDto[]>([]);

  const [formData, setFormData] = useState<CreateAssignmentDto>({
    courseId: UrlExtractor.extractCourseId(),
    name: '',
    content: '',
    duedAt: null,
    canViewScore: false,
    canRetry: false,
    type: 'questions',
  });

  const createAssignment = useCreateAssignment();
  const navigate = useNavigate();

  const handleSave = async () => {
    await createAssignment.mutateAsync(formData);

    navigate(`/course/${formData.courseId}/assignment`);
  };

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>
        Object Oriented Programming - Add Assignment
      </h1>
      <AddAssignmentForm
        formData={formData}
        questions={questions}
        onFormChange={setFormData}
        onQuestionsChange={setQuestions}
        onSave={handleSave}
      />
    </div>
  );
};

export default AddAssignmentPage;
