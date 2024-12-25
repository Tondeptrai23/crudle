import { cn } from '@/lib/utils';
import { CreateQuestionDto } from '@/types/assignment';
import { AlphabetMapper } from '@/utils/helper';
import { Card } from '../common/ui/card';
import { Input } from '../common/ui/input';

interface WorkspaceQuestionCardProps {
  question: CreateQuestionDto;
  index: number;
  selectedAnswer: string;
  onAnswerSelect: (value: string) => void;
}

const WorkspaceQuestionCard = ({
  question,
  index,
  selectedAnswer,
  onAnswerSelect,
}: WorkspaceQuestionCardProps) => {
  if (question.type === 'Fill In Blank') {
    const [before, after] = question.content.split('___');
    return (
      <Card className='p-4'>
        <h3 className='mb-4 font-semibold'>Question {index + 1}</h3>
        <div className='flex items-center space-x-2'>
          <span>{before}</span>
          <Input
            className='inline-block w-40'
            value={selectedAnswer || ''}
            onChange={(e) => onAnswerSelect(e.target.value)}
            placeholder='Type your answer'
          />
          <span>{after}</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className='p-4'>
      <h3 className='mb-4 font-semibold'>Question {index + 1}</h3>
      <div className='mb-4'>{question.content}</div>
      <div className='space-y-2'>
        {question.answers.map((answer, answerIndex) => (
          <div
            key={answer.answerId}
            className={cn(
              'flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition-colors',
              selectedAnswer === answer.value
                ? 'bg-blue-100 hover:bg-blue-200'
                : 'bg-gray-100 hover:bg-gray-200',
            )}
            onClick={() => onAnswerSelect(answer.value)}
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-md border font-semibold',
                selectedAnswer === answer.value
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-white text-gray-800',
              )}
            >
              {AlphabetMapper.numberToLetter(answerIndex)}
            </div>
            <div>{answer.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorkspaceQuestionCard;
