// components/QuestionCard.tsx
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import { CreateQuestionDto } from '@/types/assignment';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import AnswerCard from './AnswerCard.tsx';
import EditingQuestionCard from './EdittingQuestionCard.tsx';

interface QuestionCardProps {
  question: CreateQuestionDto;
  index: number;
  showButton: boolean;
  onQuestionChange: (questionId: number, content: string) => void;
  onAnswerChange: (questionId: number, answerId: number, value: string) => void;
  onAnswerCorrectChange: (questionId: number, answerId: number) => void;
}

const QuestionCard = ({
  question,
  index,
  showButton,
  onQuestionChange,
  onAnswerChange,
  onAnswerCorrectChange,
}: QuestionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <EditingQuestionCard
      question={question}
      index={index}
      onQuestionChange={onQuestionChange}
      onAnswerChange={onAnswerChange}
      onAnswerCorrectChange={onAnswerCorrectChange}
    />
  ) : (
    <Card className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-semibold'>Question {index + 1}</h3>
        <div className='flex space-x-2'>
          {showButton && (
            <>
              <Button
                variant='outline'
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                <Edit className='h-4 w-4' />
                Edit
              </Button>
              <Button variant='outline'>
                <Trash className='h-4 w-4' />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <div className='mb-4'>{question.content}</div>

      <div className='space-y-2'>
        {question.answers.map((answer, index) => (
          <AnswerCard key={answer.answerId} answer={answer} index={index} />
        ))}
      </div>
    </Card>
  );
};

export default QuestionCard;
