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
  const [questionError, setQuestionError] = useState('');
  const [answerErrors, setAnswerErrors] = useState<Record<number, string>>({});

  const onAnswerChange = (answerId: number, value: string) => {
    const newAnswerErrors = { ...answerErrors, [answerId]: '' };
    setAnswerErrors(newAnswerErrors);

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

  const validate = () => {
    if (!questionContent) {
      setQuestionError('Question content is required');
    }

    const errors: Record<number, string> = {};
    answers.forEach((answer) => {
      if (!answer.value) {
        errors[answer.answerId] = 'Answer content is required';
      }
    });

    setAnswerErrors(errors);
  };

  return (
    <Card className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-semibold'>Question {index + 1}</h3>
      </div>

      <div className='mb-4'>
        <Input
          value={questionContent}
          onChange={(e) => {
            setQuestionContent(e.target.value);
            setQuestionError('');
          }}
        />
        {questionError && (
          <p className='text-sm text-red-500'>{questionError}</p>
        )}
      </div>

      <div className='mb-4 space-y-2'>
        {answers.map((answer) => (
          <EditingAnswerCard
            key={answer.answerId}
            answer={answer}
            error={answerErrors[answer.answerId]}
            onDelete={() =>
              setAnswers(answers.filter((a) => a.answerId !== answer.answerId))
            }
            onAnswerChange={(value: string) =>
              onAnswerChange(answer.answerId, value)
            }
            onCorrectChange={() => onAnswerCorrectChange(answer.answerId)}
          />
        ))}
      </div>

      <Button
        className='text-md mb-4 w-full font-semibold'
        variant='outline'
        onClick={() => {
          setAnswers([
            ...answers,
            {
              answerId: answers.length,
              value: '',
              isCorrect: false,
            },
          ]);

          setAnswerErrors({ ...answerErrors, [answers.length]: '' });
        }}
      >
        Add Answer
      </Button>

      <div className='flex flex-row justify-end gap-4'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant='default'
          className='bg-blue-500 hover:bg-blue-700'
          onClick={() => {
            validate();

            if (questionError || Object.keys(answerErrors).length > 0) {
              return;
            }

            onDone({ ...question, content: questionContent, answers });
          }}
        >
          Done Editing
        </Button>
      </div>
    </Card>
  );
};

export default EditingQuestionCard;
