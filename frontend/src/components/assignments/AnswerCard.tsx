// components/AnswerCard.tsx
import { Input } from '@/components/common/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/radio-group';

interface AnswerCardProps {
  answer: {
    answerId: string;
    value: string;
    isCorrect: boolean;
  };
  onAnswerChange: (value: string) => void;
  onCorrectChange: () => void;
}

export const AnswerCard = ({
  answer,
  onAnswerChange,
  onCorrectChange,
}: AnswerCardProps) => {
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
