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
import Teacher from '@/types/teacher';

const formSchema = z.object({
  teacherId: z.string().optional(),
  contactEmail: z.string().email('Invalid email address'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullname: z.string().min(2, 'Name must be at least 2 characters'),
  contactPhone: z
    .string()
    .min(6, 'Phone number must be at least 6 characters')
    .regex(/^[0-9-+\s()]*$/, 'Invalid phone number format'),
}) satisfies z.ZodType<Partial<Omit<Teacher, 'id'>>>;

export { formSchema as TeacherFormSchema };

type FormValues = z.infer<typeof formSchema>;

interface AddTeacherFormProps {
  onSubmit: (data: FormValues) => void;
}

const AddTeacherForm: React.FC<AddTeacherFormProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactEmail: '',
      password: '',
      fullname: '',
      contactPhone: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full max-w-md space-y-6 p-6'
      >
        <span className='block text-center text-2xl font-bold'>
          Add Teacher
        </span>
        <FormField
          control={form.control}
          name='teacherId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher ID</FormLabel>
              <FormControl>
                <Input placeholder='001' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='Dr. John Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contactEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@school.edu' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contactPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='555-0123' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full bg-blue-500'>
          Add Teacher
        </Button>
      </form>
    </Form>
  );
};

export default AddTeacherForm;
