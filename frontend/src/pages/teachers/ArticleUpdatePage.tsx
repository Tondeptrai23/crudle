import { useNavigate, useParams} from "react-router-dom";
import { useArticleDetail, useUpdateArticle } from "@/hooks/api/useArticleApi";
import { ArticleRequest } from "@/types/article";
import ArticleForm from "@/components/articles/ArticleForm";
import useAuth from "@/hooks/useAuth";
import { Role } from "@/types/enums";

const ArticleUpdatePage: React.FC = () => {
  const { role } = useAuth();
  if (role !== Role.Teacher) {
    throw new Error("Only teachers can update articles");
  }

  const { courseId, articleId } = useParams();
  if (!courseId || !articleId) {
    throw new Error("Missing parameter in the URL");
  }
  
  const updateArticle = useUpdateArticle(courseId, articleId);
  const navigate = useNavigate();
  const { data: article, isLoading } = useArticleDetail("teacher", { courseId, articleId });

  if (isLoading) {
    // TODO: Add skeleton loader
    return <div>Loading...</div>;
  }

  // I don't like this code but it's working
  const onSubmit = async (request: ArticleRequest) => {
    updateArticle.mutate(request);
    if (!updateArticle.error) {
      navigate(`/course/${courseId}`);
      return;
    }
    throw new Error("Failed to update article");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-8">
          Edit Article
        </h1> 
        <ArticleForm article={article} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ArticleUpdatePage;