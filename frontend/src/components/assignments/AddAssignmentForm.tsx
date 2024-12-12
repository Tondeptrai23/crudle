// components/AssignmentForm.tsx
import { Button } from '@/components/common/ui/button';
import { Checkbox } from '@/components/common/ui/checkbox';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { Textarea } from '@/components/common/ui/textarea';
import { CreateAssignmentDto, Question } from '@/types/assignment';
import { Plus } from 'lucide-react';
import { QuestionCard } from './QuestionCard';

interface AssignmentFormProps {
  formData: CreateAssignmentDto;
  questions: Question[];
  onFormChange: (data: CreateAssignmentDto) => void;
  onQuestionsChange: (questions: Question[]) => void;
  onSave: () => void;
}

const AddAssignmentForm: React.FC<AssignmentFormProps> = ({
  formData,
  questions,
  onFormChange,
  onQuestionsChange,
  onSave,
}) => {
  const handleQuestionContentChange = (questionId: string, content: string) => {
    const updatedQuestions = questions.map((q) =>
      q.questionId === questionId ? { ...q, content } : q,
    );
    onQuestionsChange(updatedQuestions);
  };

  const handleAnswerChange = (
    questionId: string,
    answerId: string,
    value: string,
  ) => {
    const updatedQuestions = questions.map((q) =>
      q.questionId === questionId
        ? {
            ...q,
            answers: q.answers.map((a) =>
              a.answerId === answerId ? { ...a, value } : a,
            ),
          }
        : q,
    );
    onQuestionsChange(updatedQuestions);
  };

  const handleAnswerCorrectChange = (questionId: string, answerId: string) => {
    const updatedQuestions = questions.map((q) =>
      q.questionId === questionId
        ? {
            ...q,
            answers: q.answers.map((a) => ({
              ...a,
              isCorrect: a.answerId === answerId,
            })),
          }
        : q,
    );
    onQuestionsChange(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      assignmentId: 'a2',
      questionId: `q${questions.length + 1}`,
      content: '',
      type: 'Multiple Choice',
      answers: [
        {
          answerId: `a${questions.length}_1`,
          questionId: `q${questions.length + 1}`,
          value: '',
          isCorrect: true,
        },
        {
          answerId: `a${questions.length}_2`,
          questionId: `q${questions.length + 1}`,
          value: '',
          isCorrect: false,
        },
        {
          answerId: `a${questions.length}_3`,
          questionId: `q${questions.length + 1}`,
          value: '',
          isCorrect: false,
        },
      ],
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>
        Object Oriented Programming - Add Assignment
      </h1>

      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) =>
                onFormChange({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor='dueDate'>Due Date</Label>
            <Input
              id='dueDate'
              type='date'
              value={formData.duedAt?.toLocaleDateString()}
              onChange={(e) =>
                onFormChange({ ...formData, duedAt: new Date(e.target.value) })
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor='content'>Content</Label>
          <Textarea
            id='content'
            value={formData.content}
            onChange={(e) =>
              onFormChange({ ...formData, content: e.target.value })
            }
          />
        </div>

        <div className='flex space-x-6'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='canViewScore'
              checked={formData.canViewScore}
              onCheckedChange={(checked) =>
                onFormChange({ ...formData, canViewScore: Boolean(checked) })
              }
            />
            <Label htmlFor='canViewScore'>Can View Score</Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='canRetry'
              checked={formData.canRetry}
              onCheckedChange={(checked) =>
                onFormChange({ ...formData, canRetry: Boolean(checked) })
              }
            />
            <Label htmlFor='canRetry'>Can Retry</Label>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.questionId}
            question={question}
            index={index}
            onQuestionChange={handleQuestionContentChange}
            onAnswerChange={handleAnswerChange}
            onAnswerCorrectChange={handleAnswerCorrectChange}
          />
        ))}

        <Button
          onClick={handleAddQuestion}
          variant='outline'
          className='w-full'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Question
        </Button>
      </div>

      <div className='flex justify-end space-x-2'>
        <Button variant='outline'>Cancel</Button>
        <Button onClick={onSave}>Save Assignment</Button>
      </div>
    </div>
  );
};

export default AddAssignmentForm;
