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

const formSchema = z.object({
  fullname: z.string().min(2, 'Name must be at least 2 characters'),
  dob: z.string().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    return birthDate < today;
  }, 'Date of birth must be in the past'),
});

type FormValues = z.infer<typeof formSchema>;

interface EditStudentFormProps {
  onSubmit: (data: FormValues) => void;
}
const EditStudentForm: React.FC<EditStudentFormProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      dob: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full max-w-md space-y-6 p-6'
      >
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default EditStudentForm;
