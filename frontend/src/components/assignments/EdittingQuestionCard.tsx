// components/EditingQuestionCard.tsx
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import { Input } from '@/components/common/ui/input';
import { CreateQuestionDto } from '@/types/assignment';
import { Trash } from 'lucide-react';
import EditingAnswerCard from './EditingAnswerCard.tsx';

interface EditingQuestionCardProps {
  question: CreateQuestionDto;
  index: number;
  onQuestionChange: (questionId: number, content: string) => void;
  onAnswerChange: (questionId: number, answerId: number, value: string) => void;
  onAnswerCorrectChange: (questionId: number, answerId: number) => void;
}

const EditingQuestionCard = ({
  question,
  index,
  onQuestionChange,
  onAnswerChange,
  onAnswerCorrectChange,
}: EditingQuestionCardProps) => {
  return (
    <Card className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-semibold'>Question {index + 1}</h3>
        <div className='flex space-x-2'>
          <Button variant='outline'>
            <Trash className='h-4 w-4' />
            Delete
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
          <EditingAnswerCard
            key={answer.answerId}
            answer={answer}
            onAnswerChange={(value: string) =>
              onAnswerChange(question.questionId, answer.answerId, value)
            }
            onCorrectChange={() =>
              onAnswerCorrectChange(question.questionId, answer.answerId)
            }
          />
        ))}
      </div>

      <Button variant='outline'>Add Answer</Button>
    </Card>
  );
};

export default EditingQuestionCard;
