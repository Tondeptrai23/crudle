import AddAssignmentForm from '@/components/assignments/AddAssignmentForm';
import AnswerCard from '@/components/assignments/AnswerCard';
import { CreateAssignmentDto, CreateQuestionDto } from '@/types/assignment';
import { useState } from 'react';

const AddAssignmentPage = () => {
  const [questions, setQuestions] = useState<CreateQuestionDto[]>([
    {
      assignmentId: 'a2',
      questionId: 1,
      content: 'What is TypeScript?',
      answers: [
        {
          answerId: 0,
          value: 'A programming language',
          isCorrect: true,
        },
        {
          answerId: 1,
          value: 'A type of coffee',
          isCorrect: false,
        },
        {
          answerId: 2,
          value: 'A music genre',
          isCorrect: false,
        },
      ],
      type: 'Multiple Choice',
    },
    {
      questionId: 2,
      assignmentId: 'a2',
      content: 'Explain the concept of interfaces in TypeScript.',
      answers: [
        {
          answerId: 0,
          value: 'Interfaces define the structure of an object.',
          isCorrect: true,
        },
        {
          answerId: 1,
          value: 'Interfaces are used to style web pages.',
          isCorrect: false,
        },
        {
          answerId: 2,
          value: 'Interfaces are a type of database.',
          isCorrect: false,
        },
      ],
      type: 'Multiple Choice',
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
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <AnswerCard
        answer={{
          answerId: 0,
          value: 'A programming language',
          isCorrect: true,
        }}
        index={0}
      />

      <AnswerCard
        answer={{
          answerId: 0,
          value: 'A programming language',
          isCorrect: false,
        }}
        index={1}
      />

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
