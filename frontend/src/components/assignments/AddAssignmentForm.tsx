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
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { CreateAssignmentDto, CreateQuestionDto } from '@/types/assignment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Separator } from '../common/ui/separator';
import QuestionCard from './QuestionCard';
// Define the form schema
const assignmentFormSchema = z.object({
  courseId: z.number(),
  name: z.string().min(1, 'Name is required'),
  duedAt: z.date({
    required_error: 'Due date is required',
  }),
  content: z.string().min(1, 'Content is required'),
  canViewScore: z.boolean().default(false),
  canRetry: z.boolean().default(false),
  type: z.string().default('questions'),
});

// Infer the type from the schema
type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;

interface AssignmentFormProps {
  initialData: CreateAssignmentDto;
  onSave: (formData: CreateAssignmentDto) => void;
  onCancel: () => void;
}

const AddAssignmentForm: React.FC<AssignmentFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [questions, setQuestions] = useState<CreateQuestionDto[]>([]);
  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      courseId: initialData.courseId,
      name: initialData.name,
      duedAt: initialData.duedAt || new Date(),
      content: initialData.content,
      canViewScore: initialData.canViewScore,
      canRetry: initialData.canRetry,
    },
  });

  const onSubmit = (values: AssignmentFormValues) => {
    if (isSaving) return;

    setIsSaving(true);
    const result = values as CreateAssignmentDto;
    result.questions = questions;

    if (result.questions.some((q) => q.isNew)) {
      toast({
        title: 'Error',
        description: 'Please complete all questions',
        variant: 'destructive',
      });

      setIsSaving(false);
      return;
    }
    try {
      onSave(result);

      toast({
        title: 'Saved',
        description: 'Successfully saved the assignment',
      });
    } catch (error) {
      toast({
        title: 'Failed to save',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuestionContentChange = (question: CreateQuestionDto) => {
    const newQuestions = questions.map((q) => {
      if (q.questionId === question.questionId) {
        return question;
      }
      return q;
    });
    setQuestions(newQuestions);
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
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: number) => {
    const result = questions.filter((q) => q.questionId !== questionId);

    setQuestions(result);
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
          <Button type='button' variant='outline' onClick={onCancel}>
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
