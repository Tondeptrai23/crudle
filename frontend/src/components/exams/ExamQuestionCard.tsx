import { cn } from '@/lib/utils';
import { ExamQuestion } from '@/types/exam';
import { Card } from '../common/ui/card';
import { Input } from '../common/ui/input';

interface ExamQuestionCardProps {
  question: ExamQuestion;
  index: number;
  selectedAnswer: string;
  disabled?: boolean;
  onAnswerSelect: (value: string) => void;
}

const ExamQuestionCard = ({
  question,
  index,
  selectedAnswer,
  onAnswerSelect,
  disabled,
}: ExamQuestionCardProps) => {
  return (
    <Card className='p-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold'>Question {index + 1}</h3>
        <p className='mt-2'>{question.content}</p>
      </div>

      {question.type === 'Fill In Blank' ? (
        <div className='mt-4'>
          <Input
            disabled={disabled}
            placeholder='Type your answer'
            value={selectedAnswer || ''}
            onChange={(e) => onAnswerSelect(e.target.value)}
          />
        </div>
      ) : (
        <div className='mt-4 space-y-2'>
          {question.answers.map((answer, answerIndex) => (
            <div
              key={answer.answerId}
              className={cn(
                'cursor-pointer rounded-lg border p-4 transition-colors',
                selectedAnswer === answer.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50',
              )}
              onClick={() => {
                if (disabled) return;
                onAnswerSelect(answer.value);
              }}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full border',
                    selectedAnswer === answer.value
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300',
                  )}
                >
                  {String.fromCharCode(65 + answerIndex)}
                </div>
                <span>{answer.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ExamQuestionCard;
