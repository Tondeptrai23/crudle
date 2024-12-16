// components/EditingAnswerCard.tsx
import { Input } from '@/components/common/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/radio-group';
import { CreateAnswerDto, QuestionType } from '@/types/assignment';
import { TrashIcon } from 'lucide-react';
import { Button } from '../common/ui/button';

interface EditingAnswerCardProps {
  answer: CreateAnswerDto;
  error: string | null;
  onAnswerChange: (value: string) => void;
  onCorrectChange: () => void;
  onDelete: () => void;
  questionType: QuestionType;
}

const EditingAnswerCard = ({
  answer,
  error,
  onAnswerChange,
  onCorrectChange,
  onDelete,
  questionType,
}: EditingAnswerCardProps) => {
  return (
    <>
      <div className='flex items-center space-x-2'>
        {questionType === 'Multiple Choice' && (
          <RadioGroup
            value={answer.isCorrect ? 'true' : 'false'}
            onValueChange={onCorrectChange}
          >
            <RadioGroupItem value='true' />
          </RadioGroup>
        )}
        <Input
          value={answer.value}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder={
            questionType === 'Fill In Blank'
              ? 'Enter the correct answer'
              : 'Enter answer option'
          }
        />
        {questionType === 'Multiple Choice' && onDelete && (
          <Button onClick={onDelete} type='button' variant='ghost' size='icon'>
            <TrashIcon />
          </Button>
        )}
      </div>
      {error && <p className='ml-8 text-sm text-red-500'>{error}</p>}
    </>
  );
};

export default EditingAnswerCard;
