import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/common/ui/form";
import { AutosizeTextarea } from "@/components/common/ui/autosized-textarea";
import { Button } from "@/components/common/ui/button";
import { useNavigate } from "react-router-dom";
import { Article, ArticleRequest } from "@/types/article";
import ArticleContentEditor from "./ArticleContentEditor";

const formSchema = z.object({
  title: z.string(),
  summary: z.string(),
  content: z.string(),
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
      title: article?.title || "Untitled",
      summary: article?.summary,
      content: article?.content,
    },
  });

  const onFormSubmit = (data: FormValues) => {
    const request : ArticleRequest = {
      title: data.title,
      summary: data.summary,
      content: data.content,
    };

    onSubmit(request);
  }    

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className='mx-auto'>
        <div className='space-y-4 px-8 py-6 border-b'>
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
                <FormControl>
                  <AutosizeTextarea
                    placeholder='Write a brief summary...'
                    className='border-none text-lg text-gray-600 placeholder:text-gray-300 focus-visible:ring-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                    onContentChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Fixed bottom toolbar */}
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3'>
          <div className='max-w-4xl mx-auto flex gap-4 justify-end'>
            <Button type='button' variant='outline' onClick={() => navigate(-1)}>Cancel</Button>
            <Button type='submit'>Publish</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;