// components/QuestionCard.tsx
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import { Input } from '@/components/common/ui/input';
import { Question } from '@/types/assignment';
import { Edit, Trash } from 'lucide-react';
import { AnswerCard } from './AnswerCard.tsx';

interface QuestionCardProps {
  question: Question;
  index: number;
  onQuestionChange: (questionId: string, content: string) => void;
  onAnswerChange: (questionId: string, answerId: string, value: string) => void;
  onAnswerCorrectChange: (questionId: string, answerId: string) => void;
}

export const QuestionCard = ({
  question,
  index,
  onQuestionChange,
  onAnswerChange,
  onAnswerCorrectChange,
}: QuestionCardProps) => {
  return (
    <Card className='p-4'>
      <div className='mb-4 flex items-start justify-between'>
        <h3 className='font-semibold'>Question {index + 1}</h3>
        <div className='flex space-x-2'>
          <Button variant='ghost' size='icon'>
            <Edit className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <Input
        className='mb-4'
        value={question.content}
        onChange={(e) => onQuestionChange(question.questionId, e.target.value)}
      />

      <div className='space-y-2'>
        {question.answers.map((answer) => (
          <AnswerCard
            key={answer.answerId}
            answer={answer}
            onAnswerChange={(value) =>
              onAnswerChange(question.questionId, answer.answerId, value)
            }
            onCorrectChange={() =>
              onAnswerCorrectChange(question.questionId, answer.answerId)
            }
          />
        ))}
      </div>
    </Card>
  );
};
