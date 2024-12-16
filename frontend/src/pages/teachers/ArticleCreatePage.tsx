import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/common/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import * as z from "zod";
import { AutosizeTextarea } from "@/components/common/ui/autosized-textarea";
import { useCreateArticle } from "@/hooks/api/useArticleApi";

const formSchema = z.object({
  title: z.string(),
  summary: z.string(),
  content: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const ArticleCreatePage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  if (!courseId) {
    throw new Error("Missing courseId parameter");
  }

  const createArticle = useCreateArticle(courseId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
    },
  });


  const onSubmit = (data: FormValues) => {
    createArticle.mutate(data);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-8">
          Create New Article
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter article title" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder="Enter article summary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder="Enter article content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={createArticle.isPending}
              >
                {createArticle.isPending ? "Creating..." : "Create Article"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ArticleCreatePage;