import { Button } from '@/components/common/ui/button';
import { Checkbox } from '@/components/common/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/ui/form';
import { Input } from '@/components/common/ui/input';
import { Textarea } from '@/components/common/ui/textarea';
import { CreateAssignmentDto, CreateQuestionDto } from '@/types/assignment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Separator } from '../common/ui/separator';
import QuestionCard from './QuestionCard';

// Define the form schema
const assignmentFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  duedAt: z.date({
    required_error: 'Due date is required',
  }),
  content: z.string().min(1, 'Content is required'),
  canViewScore: z.boolean().default(false),
  canRetry: z.boolean().default(false),
});

// Infer the type from the schema
type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;

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
  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      name: formData.name,
      duedAt: formData.duedAt || new Date(),
      content: formData.content,
      canViewScore: formData.canViewScore,
      canRetry: formData.canRetry,
    },
  });

  const onSubmit = (values: AssignmentFormValues) => {
    onFormChange(values as CreateAssignmentDto);
    onSave();
  };

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
      questionId: questions.length + 1,
      content: '',
      isNew: true,
      type: 'Multiple Choice',
      answers: [
        { answerId: 0, value: '', isCorrect: true },
        { answerId: 1, value: '', isCorrect: false },
        { answerId: 2, value: '', isCorrect: false },
      ],
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: number) => {
    const result = questions
      .filter((q) => q.questionId !== questionId)
      .map((q, i) => ({ ...q, questionId: i }));
    onQuestionsChange(result);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='duedAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex space-x-6'>
            <FormField
              control={form.control}
              name='canViewScore'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Can View Score</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='canRetry'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Can Retry</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Questions section  */}
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-lg font-semibold'>Questions</h2>
          <Button
            type='button'
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
              onDelete={handleDeleteQuestion}
              onQuestionChange={handleQuestionContentChange}
            />
          ))}
        </div>

        <Separator />

        <div className='flex justify-end space-x-2'>
          <Button type='button' variant='outline'>
            Cancel
          </Button>
          <Button type='submit' className='bg-blue-500 hover:bg-blue-700'>
            Save Assignment
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAssignmentForm;
