import { Separator } from "@/components/common/ui/separator";
import { useArticleDetail } from "@/hooks/api/useCourseApi";
import useAuth from "@/hooks/useAuth";
import { CalendarDays, Clock } from "lucide-react";
import { useParams } from "react-router-dom";

const ArticleDetailPage : React.FC = () => {
  const { articleId, courseId } = useParams();
  const { role } = useAuth();

  if (!articleId || !courseId) {
    throw new Error("Missing articleId or courseId in URL params");
  }

  const { data: article, isLoading, error } = useArticleDetail(role, {courseId: courseId, articleId: articleId});

  if (isLoading) return <div>Loading...</div>;

  if (error || !article) throw new Error("Error loading article");

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-muted-foreground">
            {article.summary}
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Created: {new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last update: {new Date(article.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="pt-6"> 
          <div className="prose prose-gray max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('•')) {
                return (
                  <ul key={index} className="list-disc pl-4">
                    {paragraph.split('•').filter(Boolean).map((item, i) => (
                      <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;