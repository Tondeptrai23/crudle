import { Button } from '@/components/common/ui/button';
import { Checkbox } from '@/components/common/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';

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
import {
  CreateAssignmentDto,
  CreateQuestionDto,
  QuestionType,
} from '@/types/assignment';
import { generateUniqueId } from '@/utils/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import LoadingButton from '../common/ui/LoadingButton';
import { Separator } from '../common/ui/separator';
import QuestionCard from './QuestionCard';

// Define the form schema
const assignmentFormSchema = z.object({
  courseId: z.number(),
  name: z.string().min(1, 'Name is required'),
  dueDate: z.date(),
  content: z.string().min(1, 'Content is required'),
  canViewScore: z.boolean().default(false),
  canRetry: z.boolean().default(false),
  type: z.string().default('questions'),
});

// Infer the type from the schema
type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;

interface AssignmentFormProps {
  initialData: CreateAssignmentDto;
  onSave: (formData: CreateAssignmentDto) => Promise<void>;
  onCancel: () => void;
}

const AddAssignmentForm: React.FC<AssignmentFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [questions, setQuestions] = useState<CreateQuestionDto[]>(
    initialData.questions || [],
  );
  const [selectedType, setSelectedType] =
    useState<QuestionType>('Multiple Choice');

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      courseId: initialData.courseId,
      name: initialData.name,
      dueDate: initialData.dueDate
        ? new Date(
            initialData.dueDate.getTime() -
              initialData.dueDate.getTimezoneOffset() * 60000,
          )
        : new Date(),
      content: initialData.content,
      canViewScore: initialData.canViewScore,
      canRetry: initialData.canRetry,
    },
  });

  const onSubmit = async (values: AssignmentFormValues) => {
    if (isSaving) return;

    setIsSaving(true);
    const result = values as CreateAssignmentDto;
    result.questions = questions;

    if (result.dueDate) {
      result.dueDate = new Date(result.dueDate);
    }

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
      await onSave(result);

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

  const handleAddQuestion = (type: QuestionType = 'Multiple Choice') => {
    const newQuestion: CreateQuestionDto = {
      questionId: generateUniqueId(),
      content: '',
      isNew: true,
      type,
      answers:
        type === 'Multiple Choice'
          ? [
              { answerId: 0, value: '', isCorrect: true },
              { answerId: 1, value: '', isCorrect: false },
              { answerId: 2, value: '', isCorrect: false },
            ]
          : [{ answerId: 0, value: '', isCorrect: true }],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: number) => {
    const result = questions.filter((q) => q.questionId !== questionId);

    setQuestions(result);
  };

  const formatDate = (date: string | Date, format: 'display' | 'input') => {
    const d = new Date(date);

    if (format === 'input') {
      return d.toISOString().slice(0, -8);
    }

    const pad = (num: number) => num.toString().padStart(2, '0');
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return `${day}-${month}-${year} ${hours}:${minutes}`;
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
              name='dueDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type='datetime-local'
                      {...field}
                      value={formatDate(field.value, 'input')}
                      onChange={(e) => {
                        if (e.target.value) {
                          field.onChange(
                            new Date(
                              new Date(e.target.value).getTime() -
                                new Date().getTimezoneOffset() * 60000,
                            ),
                          );
                        } else {
                          field.onChange(null);
                        }
                      }}
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

          <div className='flex space-x-6 pt-4'>
            <FormField
              control={form.control}
              name='canViewScore'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      className='data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500'
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
                <FormItem className='flex items-center space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      className='data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500'
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
          <div className='flex gap-2'>
            <Select
              defaultValue='multiple-choice'
              onValueChange={(value) => {
                setSelectedType(
                  value === 'multiple-choice'
                    ? 'Multiple Choice'
                    : 'Fill In Blank',
                );
              }}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Question Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='multiple-choice'>Multiple Choice</SelectItem>
                <SelectItem value='fill-blank'>Open-ended</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type='button'
              onClick={() => handleAddQuestion(selectedType)}
              className='bg-blue-500 hover:bg-blue-700'
            >
              <Plus className='mr-2 h-4 w-4' />
              Add
            </Button>
          </div>
        </div>

        <div className='space-y-4'>
          {questions.map((question, index) => (
            <QuestionCard
              selected={false}
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
          <LoadingButton
            type='submit'
            className='bg-blue-500 hover:bg-blue-700'
            isLoading={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddAssignmentForm;
