// components/AnswerCard.tsx
import { cn } from '@/lib/utils';
import { CreateAnswerDto, QuestionType } from '@/types/assignment';
import { AlphabetMapper } from '@/utils/helper';

interface AnswerCardProps {
  answer: CreateAnswerDto;
  index: number;
  selected: string | false;
  questionType: QuestionType;
}

const AnswerCard = ({ answer, index, questionType, selected }: AnswerCardProps) => {
  if (questionType === 'Fill In Blank') {
    return (
      <div className='flex items-center space-x-4 rounded-lg bg-slate-200 p-2'>
        <div className='font-semibold'>Correct Answer:</div>
        <div>{answer.value}</div>
      </div>
    );
  }

  return (
    <div className='flex items-center space-x-4 rounded-lg bg-slate-200 p-1'>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 font-semibold',
          (answer.isCorrect) 
            ? (selected === false || selected === answer.value)
							? 'bg-green-500 text-white'
							: 'bg-blue-500 text-white'
            :	(selected === answer.value) 
							? 'bg-red-500 text-white' 
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
