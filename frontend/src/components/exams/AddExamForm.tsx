import { Button } from '@/components/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/ui/form';
import { Input } from '@/components/common/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';
import { Textarea } from '@/components/common/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { CreateQuestionDto, QuestionType } from '@/types/assignment';
import { CreateExamDto } from '@/types/exam';
import { generateUniqueId } from '@/utils/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import QuestionCard from '../assignments/QuestionCard';
import LoadingButton from '../common/ui/LoadingButton';
import { Separator } from '../common/ui/separator';

// Define the form schema with exam-specific fields
const examFormSchema = z.object({
  courseId: z.number(),
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Content is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  startDate: z
    .union([z.date(), z.string().transform((str) => new Date(str))])
    .refine((date) => date > new Date(), {
      message: 'Start date must be in the future',
    }),
});

type ExamFormValues = z.infer<typeof examFormSchema>;

interface ExamFormProps {
  initialData: CreateExamDto;
  onSave: (formData: CreateExamDto) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

const AddExamForm: React.FC<ExamFormProps> = ({
  initialData,
  onSave,
  onCancel,
  isEdit = false,
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [questions, setQuestions] = useState<CreateQuestionDto[]>(
    initialData.questions || [],
  );
  const [selectedType, setSelectedType] =
    useState<QuestionType>('Multiple Choice');

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      courseId: initialData.courseId,
      name: initialData.name,
      content: initialData.content,
      duration: initialData.duration || 60, // Default 60 minutes
      startDate: initialData.startDate
        ? new Date(
            new Date(initialData.startDate).getTime() -
              new Date().getTimezoneOffset() * 60000,
          )
        : new Date(),
    },
  });

  const onSubmit = async (values: ExamFormValues) => {
    if (isSaving) return;

    if (questions.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one question',
        variant: 'destructive',
      });
      return;
    }

    if (questions.some((q) => q.isNew)) {
      toast({
        title: 'Error',
        description: 'Please complete all questions',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const examData: CreateExamDto = {
        ...values,
        questions: questions,
      };

      await onSave(examData);

      toast({
        title: 'Success',
        description: `Exam ${isEdit ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
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
    setQuestions(questions.filter((q) => q.questionId !== questionId));
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
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
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
            name='duration'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        <Separator />

        {/* Questions section */}
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
            <div key={question.questionId}>
              <QuestionCard
                showButton={true}
                question={question}
                index={index}
                onDelete={handleDeleteQuestion}
                onQuestionChange={handleQuestionContentChange}
              />
            </div>
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
            {isSaving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddExamForm;
