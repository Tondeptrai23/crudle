import { useNavigate, useParams} from "react-router-dom";
import { useCreateArticle } from "@/hooks/api/useArticleApi";
import { ArticleRequest } from "@/types/article";
import ArticleForm from "@/components/articles/ArticleForm";
import useAuth from "@/hooks/useAuth";
import { Role } from "@/types/enums";

const ArticleCreatePage: React.FC = () => {
  const { role } = useAuth();
  if (role !== Role.Teacher) {
    throw new Error("Only teachers can create articles");
  }
  
  const { courseId } = useParams();
  const navigate = useNavigate();

  if (!courseId) {
    throw new Error("Missing courseId parameter");
  }
  const createArticle = useCreateArticle(courseId);

  // I don't like this code but it's working
  const onSubmit = async (request: ArticleRequest) => {
    createArticle.mutate(request);
    if (!createArticle.error) {
      navigate(`/course/${courseId}`);
      return;
    }
    throw new Error("Failed to create article");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-8">
          Create New Article
        </h1> 
        <ArticleForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ArticleCreatePage;