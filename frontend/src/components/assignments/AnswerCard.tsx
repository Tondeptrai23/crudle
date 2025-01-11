// components/AnswerCard.tsx
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { CreateAnswerDto, QuestionType } from '@/types/assignment';
import { Role } from '@/types/enums';
import { AlphabetMapper } from '@/utils/helper';

interface AnswerCardProps {
  answer: CreateAnswerDto;
  index: number;
  selected: string | false;
  questionType: QuestionType;
}

const AnswerCard = ({ answer, index, questionType, selected }: AnswerCardProps) => {
	const { role } = useAuth();

  if (questionType === 'Fill In Blank') {
    return (
      <>
        {selected !== false && (
        <div className='flex items-center space-x-4 rounded-lg bg-slate-200 p-2'>
          <div className='font-semibold'>Selected Answer:</div>
          <div>{selected}</div>
        </div>
        )}
				{role !== Role.Student && (
					<div className='flex items-center space-x-4 rounded-lg bg-slate-200 p-2'>
          <div className='font-semibold'>Correct Answer:</div>
          <div>{answer.value}</div>
        </div>
				)}
      </>
    );
  }

	const submittedAnswer = selected !== false;
	const isStudent = (role === Role.Student);
	const selectedCorrectAnswer = submittedAnswer && (selected === answer.value && answer.isCorrect);
	const unselctedCorrectAnswer = submittedAnswer && (selected !== answer.value && answer.isCorrect);
	const selectedWrongAnswer = submittedAnswer && (selected === answer.value && !answer.isCorrect);
	const studentSelectedAnswer = isStudent && submittedAnswer && (selected === answer.value);
	const generalCorrectAnswer = !submittedAnswer && answer.isCorrect;

  return (
    <div className='flex items-center space-x-4 rounded-lg bg-slate-200 p-1'>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 font-semibold',
          generalCorrectAnswer
            ? 'bg-green-500 text-white'
            : studentSelectedAnswer
              ? 'bg-blue-500 text-white'
              : selectedCorrectAnswer
                ? 'bg-green-500 text-white'
                : unselctedCorrectAnswer
                  ? 'bg-blue-500 text-white'
                  : selectedWrongAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-300 text-gray-700',
        )}
      >
        {AlphabetMapper.numberToLetter(index)}
      </div>
      <div>{answer.value}</div>
    </div>
  );
};

export default AnswerCard;
