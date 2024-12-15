// components/AssignmentForm.tsx
import { Button } from '@/components/common/ui/button';
import { Checkbox } from '@/components/common/ui/checkbox';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { Textarea } from '@/components/common/ui/textarea';
import { CreateAssignmentDto, CreateQuestionDto } from '@/types/assignment';
import { Plus } from 'lucide-react';
import QuestionCard from './QuestionCard';

interface AssignmentFormProps {
  formData: CreateAssignmentDto;
  questions: CreateQuestionDto[];
  onFormChange: (data: CreateAssignmentDto) => void;
  onQuestionsChange: (questions: CreateQuestionDto[]) => void;
  onSave: () => void;
}

const AddAssignmentForm: React.FC<AssignmentFormProps> = ({
  formData,
  questions,
  onFormChange,
  onQuestionsChange,
  onSave,
}) => {
  const handleQuestionContentChange = (question: CreateQuestionDto) => {
    const newQuestions = questions.map((q) => {
      if (q.questionId === question.questionId) {
        return question;
      }
      return q;
    });
    onQuestionsChange(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion: CreateQuestionDto = {
      assignmentId: 'a2',
      questionId: questions.length + 1,
      content: '',
      type: 'Multiple Choice',
      answers: [
        {
          answerId: 0,
          value: '',
          isCorrect: true,
        },
        {
          answerId: 1,
          value: '',
          isCorrect: false,
        },
        {
          answerId: 2,
          value: '',
          isCorrect: false,
        },
      ],
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  return (
    <>
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

      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-lg font-semibold'>Questions</h2>

        <Button
          onClick={handleAddQuestion}
          variant='default'
          className='w-40 bg-blue-500 hover:bg-blue-700'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Question
        </Button>
      </div>

      <div className='space-y-4'>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.questionId}
            showButton={true}
            question={question}
            index={index}
            onQuestionChange={handleQuestionContentChange}
          />
        ))}
      </div>
      <div className='flex justify-end space-x-2'>
        <Button variant='outline'>Cancel</Button>
        <Button onClick={onSave}>Save Assignment</Button>
      </div>
    </>
  );
};

export default AddAssignmentForm;
