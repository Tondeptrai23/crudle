// components/EditingAnswerCard.tsx
import { Input } from '@/components/common/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/radio-group';
import { CreateAnswerDto } from '@/types/assignment';

interface EditingAnswerCardProps {
  answer: CreateAnswerDto;
  onAnswerChange: (value: string) => void;
  onCorrectChange: () => void;
}

const EditingAnswerCard = ({
  answer,
  onAnswerChange,
  onCorrectChange,
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
    </div>
  );
};

export default EditingAnswerCard;
