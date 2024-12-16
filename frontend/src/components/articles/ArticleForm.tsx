import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import { AutosizeTextarea } from "@/components/common/ui/autosized-textarea";
import { Button } from "@/components/common/ui/button";
import { useNavigate } from "react-router-dom";
import { Article, ArticleRequest } from "@/types/article";

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
      title: article?.title,
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
      <form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter article title' {...field} />
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
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <AutosizeTextarea
                  placeholder='Enter article summary'
                  {...field}
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
                <AutosizeTextarea
                  placeholder='Enter article content'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-4'>
          <Button type='submit'>Submit</Button>
          <Button type='button' variant='outline' onClick={() => navigate(-1)}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;