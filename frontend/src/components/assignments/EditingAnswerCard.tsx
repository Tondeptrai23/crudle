// components/EditingAnswerCard.tsx
import { Input } from '@/components/common/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/radio-group';
import { CreateAnswerDto } from '@/types/assignment';
import { TrashIcon } from 'lucide-react';
import { Button } from '../common/ui/button';

interface EditingAnswerCardProps {
  answer: CreateAnswerDto;
  onAnswerChange: (value: string) => void;
  onCorrectChange: () => void;
  onDelete: () => void;
}

const EditingAnswerCard = ({
  answer,
  onAnswerChange,
  onCorrectChange,
  onDelete,
}: EditingAnswerCardProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <RadioGroup
        value={answer.isCorrect ? 'true' : 'false'}
        onValueChange={onCorrectChange}
      >
        <RadioGroupItem value='true' />
      </RadioGroup>
      <Input
        value={answer.value}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
      <Button onClick={onDelete} variant='ghost' size='icon'>
        <TrashIcon />
      </Button>
    </div>
  );
};

export default EditingAnswerCard;
