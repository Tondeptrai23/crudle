import { AssignmentForm } from '@/components/assignments/AddAssignmentForm';
import { CreateAssignmentDto, Question } from '@/types/assignment';
import { useState } from 'react';

const AddAssignmentPage = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionId: 'q1',
      assignmentId: 'a2',
      content: 'What is TypeScript?',
      answers: [
        {
          answerId: 'a1',
          questionId: 'q1',
          value: 'A programming language',
          isCorrect: true,
        },
        {
          answerId: 'a2',
          questionId: 'q1',
          value: 'A type of coffee',
          isCorrect: false,
        },
        {
          answerId: 'a3',
          questionId: 'q1',
          value: 'A music genre',
          isCorrect: false,
        },
      ],
      type: 'Multiple Choice',
    },
    {
      questionId: 'q2',
      assignmentId: 'a2',
      content: 'Explain the concept of interfaces in TypeScript.',
      answers: [
        {
          answerId: 'a4',
          questionId: 'q2',
          value: 'Interfaces define the structure of an object.',
          isCorrect: true,
        },
        {
          answerId: 'a5',
          questionId: 'q2',
          value: 'Interfaces are used to style web pages.',
          isCorrect: false,
        },
        {
          answerId: 'a6',
          questionId: 'q2',
          value: 'Interfaces are a type of database.',
          isCorrect: false,
        },
      ],
      type: 'Fill In Blank',
    },
  ]);

  const [formData, setFormData] = useState<CreateAssignmentDto>({
    courseId: '',
    name: '',
    content: '',
    duedAt: null,
    canViewScore: false,
    canRetry: false,
    type: 'questions',
  });

  const handleSave = () => {
    console.log('Form Data:', formData);
    console.log('Questions:', questions);
  };

  return (
    <AssignmentForm
      formData={formData}
      questions={questions}
      onFormChange={setFormData}
      onQuestionsChange={setQuestions}
      onSave={handleSave}
    />
  );
};

export default AddAssignmentPage;
