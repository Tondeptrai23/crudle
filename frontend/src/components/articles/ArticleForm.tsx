import ArticleContentEditor from '@/components/articles/ArticleContentEditor';
import { AutosizeTextarea } from '@/components/common/ui/autosized-textarea';
import { Button } from '@/components/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/common/ui/form';
import { Article, ArticleRequest } from '@/types/article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string({
    message: 'Title is required',
  }),
  summary: z.string({
    message: 'Summary is required',
  }),
  content: z.string({
    message: 'Content is required',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  article?: Article;
  onSubmit: (request: ArticleRequest) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSubmit }) => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || 'Untitled',
      summary: article?.summary,
      content: article?.content,
    },
  });

  const onFormSubmit = (data: FormValues) => {
    const request: ArticleRequest = {
      title: data.title,
      summary: data.summary,
      content: data.content,
    };

    onSubmit(request);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className='mx-auto'>
        <div className='space-y-4 border-b px-8 py-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutosizeTextarea
                    placeholder='Untitled'
                    className='border-none text-4xl font-bold placeholder:text-gray-300 focus-visible:ring-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='summary'
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <AutosizeTextarea
                    placeholder='Write a brief summary...'
                    className='border-none text-lg text-gray-600 placeholder:text-gray-300 focus-visible:ring-0'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='min-h-[60vh] px-8 py-6'>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* <AutosizeTextarea
                    placeholder='Start writing your article...'
                    className='min-h-[50vh] border-none placeholder:text-gray-300 focus-visible:ring-0'
                    {...field}
                  /> */}
                  <ArticleContentEditor
                    content={field.value}
                    onContentChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Fixed bottom toolbar */}
        <div className='fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-3'>
          <div className='mx-auto flex max-w-4xl justify-end gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type='submit'>Publish</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;
