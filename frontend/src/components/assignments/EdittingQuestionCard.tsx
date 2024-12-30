// components/EditingQuestionCard.tsx
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import { Input } from '@/components/common/ui/input';
import { CreateQuestionDto } from '@/types/assignment';
import { generateUniqueId } from '@/utils/helper.ts';
import { useState } from 'react';
import { Label } from '../common/ui/label.tsx';
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
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [answerErrors, setAnswerErrors] = useState<
    Record<number, string | null>
  >({});

  const onAnswerChange = (answerId: number, value: string) => {
    const newAnswerErrors = { ...answerErrors, [answerId]: null };
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
        return { ...answer, isCorrect: true };
      }
      return { ...answer, isCorrect: false };
    });

    setAnswers(newAnswers);
  };

  const validate = () => {
    if (!questionContent || questionContent.length === 0) {
      setQuestionError('Question content is required');
    } else if (answers.length < 1) {
      setQuestionError('At least one answer is required');
    } else if (question.type === 'Fill In Blank' && answers.length > 1) {
      setQuestionError('Fill in the blank questions can only have one answer');
    } else if (
      question.type === 'Fill In Blank' &&
      questionContent.split('___').length !== 2
    ) {
      setQuestionError(
        'Fill in the blank questions must have exactly one blank',
      );
    } else {
      setQuestionError(null);
    }

    const errors: Record<number, string | null> = {};
    answers.forEach((answer) => {
      if (!answer.value || answer.value.length === 0) {
        errors[answer.answerId] = 'Answer content is required';
      } else {
        errors[answer.answerId] = null;
      }
    });

    setAnswerErrors(errors);

    return errors;
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
            setQuestionError(null);
          }}
          placeholder={
            question.type === 'Fill In Blank'
              ? "Enter question with ___ for blank (e.g., 'The capital of France is ___')"
              : 'Enter your question'
          }
        />
        {questionError && (
          <p className='text-sm text-red-500'>{questionError}</p>
        )}
      </div>

      <div className='mb-4 space-y-2'>
        <div className='flex items-center justify-between'>
          <Label className='text-sm font-medium'>
            {question.type === 'Multiple Choice'
              ? 'Answer Options'
              : 'Correct Answer'}
          </Label>
        </div>

        {answers.map((answer) => (
          <EditingAnswerCard
            questionType={question.type}
            key={answer.answerId}
            answer={answer}
            error={answerErrors[answer.answerId]}
            onDelete={() => {
              setAnswers(answers.filter((a) => a.answerId !== answer.answerId));
            }}
            onAnswerChange={(value: string) =>
              onAnswerChange(answer.answerId, value)
            }
            onCorrectChange={() => onAnswerCorrectChange(answer.answerId)}
          />
        ))}
      </div>

      {question.type === 'Multiple Choice' && (
        <Button
          className='text-md mb-4 w-full font-semibold'
          type='button'
          variant='outline'
          onClick={() => {
            const newAnswers = [
              ...answers,
              { answerId: generateUniqueId(), value: '', isCorrect: false },
            ];
            setAnswers(newAnswers);
          }}
        >
          Add Answer
        </Button>
      )}

      <div className='flex flex-row justify-end gap-4'>
        <Button variant='outline' type='button' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant='default'
          className='bg-blue-500 hover:bg-blue-700'
          type='button'
          onClick={async () => {
            let answerErrors = validate();

            const errors = Object.values(answerErrors).filter(
              (error) => error !== null,
            );

            if (questionError !== null || errors.length > 0) {
              return;
            }

            onDone({ ...question, content: questionContent, answers });
          }}
        >
          {question.isNew ? 'Add' : 'Save'}
        </Button>
      </div>
    </Card>
  );
};

export default EditingQuestionCard;
