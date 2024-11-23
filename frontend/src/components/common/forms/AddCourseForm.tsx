import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { Textarea } from '@/components/common/ui/textarea';
import Course from '@/types/course';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Course name must be at least 2 characters')
    .max(100, 'Course name cannot exceed 100 characters')
    .refine(
      (name) => name.trim().length > 0,
      'Course name cannot be only whitespace',
    ),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .transform((val) => val || ''),

  code: z.string(),

  startDate: z.string().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(date);
    return startDate >= today;
  }, 'Start date must be today or in the future'),
}) satisfies z.ZodType<Partial<Omit<Course, 'id'>>>;

export { formSchema as CourseFormSchema };

type FormValues = z.infer<typeof formSchema>;

interface CourseFormProps {
  onSubmit: (data: FormValues) => void;
}

const AddCourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      code: '',
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full max-w-md space-y-6 p-6'
      >
        <span className='block text-center text-2xl font-bold'>Add Course</span>

        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input
                  placeholder='CS101'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Introduction to Computer Science'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter course description...'
                  className='min-h-[100px]'
                  {...field}
                />
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
                  type='date'
                  {...field}
                  min={new Date().toISOString().split('T')[0]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full bg-blue-500'>
          Add Course
        </Button>
      </form>
    </Form>
  );
};

export default AddCourseForm;
