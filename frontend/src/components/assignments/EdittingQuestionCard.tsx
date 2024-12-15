// components/EditingQuestionCard.tsx
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import { Input } from '@/components/common/ui/input';
import { CreateQuestionDto } from '@/types/assignment';
import { useState } from 'react';
import EditingAnswerCard from './EditingAnswerCard.tsx';

interface EditingQuestionCardProps {
  question: CreateQuestionDto;
  index: number;
  onCancel: () => void;
  onDone: (question: CreateQuestionDto) => void;
}

const EditingQuestionCard = ({
  question,
  index,
  onCancel,
  onDone,
}: EditingQuestionCardProps) => {
  const [answers, setAnswers] = useState(question.answers);
  const [questionContent, setQuestionContent] = useState(question.content);

  const onAnswerChange = (answerId: number, value: string) => {
    const newAnswers = answers.map((answer) => {
      if (answer.answerId === answerId) {
        return { ...answer, value: value };
      }
      return answer;
    });

    setAnswers(newAnswers);
  };

  const onAnswerCorrectChange = (answerId: number) => {
    const newAnswers = answers.map((answer) => {
      if (answer.answerId === answerId) {
        return { ...answer, isCorrect: !answer.isCorrect };
      }
      return answer;
    });

    setAnswers(newAnswers);
  };

  return (
    <Card className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-semibold'>Question {index + 1}</h3>
      </div>

      <Input
        className='mb-4'
        value={questionContent}
        onChange={(e) => setQuestionContent(e.target.value)}
      />

      <div className='mb-4 space-y-2'>
        {answers.map((answer) => (
          <EditingAnswerCard
            key={answer.answerId}
            answer={answer}
            onAnswerChange={(value: string) =>
              onAnswerChange(answer.answerId, value)
            }
            onCorrectChange={() => onAnswerCorrectChange(answer.answerId)}
          />
        ))}
      </div>

      <div className='flex flex-row justify-end gap-4'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant='default'
          className='bg-blue-500 hover:bg-blue-700'
          onClick={() =>
            onDone({ ...question, content: questionContent, answers })
          }
        >
          Done Editing
        </Button>
      </div>
    </Card>
  );
};

export default EditingQuestionCard;
