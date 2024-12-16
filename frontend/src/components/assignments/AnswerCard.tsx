// components/AnswerCard.tsx
import { cn } from '@/lib/utils';
import { CreateAnswerDto } from '@/types/assignment';
import { AlphabetMapper } from '@/utils/helper';

interface AnswerCardProps {
  answer: CreateAnswerDto;
  index: number;
}

const AnswerCard = ({ answer, index }: AnswerCardProps) => {
  return (
    <div className='flex items-center space-x-4 rounded-lg bg-slate-200 p-1'>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 font-semibold',
          answer.isCorrect
            ? 'bg-green-500 text-white'
            : 'bg-white text-gray-800',
        )}
      >
        {AlphabetMapper.numberToLetter(index)}
      </div>
      <div>{answer.value}</div>
    </div>
  );
};

export default AnswerCard;
