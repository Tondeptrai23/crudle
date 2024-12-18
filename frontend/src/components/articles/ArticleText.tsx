import useAuth from "@/hooks/useAuth";
import { Article } from "@/types/article";
import { Role } from "@/types/enums";
import { Button } from "@/components/common/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteArticle } from "@/hooks/api/useArticleApi";
import { useToast } from "@/hooks/use-toast";

interface ArticleTextProps {
  article: Article;
  courseId: string;
  onRead: () => void;
}

const ArticleText : React.FC<ArticleTextProps> = ({ article, courseId, onRead }: ArticleTextProps) => {
  const { role } = useAuth();
  const { toast } = useToast();
  const isStudent = role.toLowerCase() === 'student';
  const deleteArticle = useDeleteArticle(courseId);
  const navigate  = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteArticle.mutate(article.id, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Delete article successfully',
        });
      },
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRead();
    navigate(`article/${article.id}`);
  };

  return (
    <div 
      className='flex items-center gap-1 px-2 hover:bg-gray-100 rounded cursor-pointer'
      onClick={handleClick}
    >
      {role !== Role.Student && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className='h-6 w-6'
            asChild
          >
            <Link to={`/course/${courseId}/article/${article.id}/edit`}>
              <Pencil className='h-3 w-3' />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className='h-6 w-6'
            onClick={handleDelete}
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        </>
      )}
      <span className={`${isStudent && !article.isRead ? 'font-bold' : 'font-normal'}`}>
        {article.title}
      </span>
    </div>
  );
};

export default ArticleText;