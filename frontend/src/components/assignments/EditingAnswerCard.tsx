// components/EditingAnswerCard.tsx
import { Input } from '@/components/common/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/radio-group';
import { CreateAnswerDto } from '@/types/assignment';

interface EditingAnswerCardProps {
  answer: CreateAnswerDto;
  onAnswerChange: (value: string) => void;
  onCorrectChange: () => void;
}

export const EditingAnswerCard = ({
  answer,
  onAnswerChange,
  onCorrectChange,
}: EditingAnswerCardProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <RadioGroup
        value={String(answer.isCorrect)}
        onValueChange={onCorrectChange}
      >
        <RadioGroupItem value={String(answer.answerId)} />
      </RadioGroup>
      <Input
        value={answer.value}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
};
