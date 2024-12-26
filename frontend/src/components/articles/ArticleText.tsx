import { Button } from '@/components/common/ui/button';
import { useDeleteArticle } from '@/hooks/api/useArticleApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { Article } from '@/types/article';
import { Role } from '@/types/enums';
import { Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ArticleTextProps {
  article: Article;
  courseId: string;
  onRead: () => void;
}

const ArticleText: React.FC<ArticleTextProps> = ({
  article,
  courseId,
  onRead,
}: ArticleTextProps) => {
  const { role } = useAuth();
  const { toast } = useToast();
  const isStudent = role === Role.Student;
  const deleteArticle = useDeleteArticle(courseId);
  const navigate = useNavigate();

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
      className='flex cursor-pointer items-center gap-1 rounded px-2 hover:bg-gray-100'
      onClick={handleClick}
    >
      {isStudent && (
        <>
          <Button variant='ghost' size='icon' className='h-6 w-6' asChild>
            <Link to={`/course/${courseId}/article/${article.id}/edit`}>
              <Pencil className='h-3 w-3' />
            </Link>
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6'
            onClick={handleDelete}
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        </>
      )}
      <span
        className={`${isStudent && !article.isRead ? 'font-bold' : 'font-normal'}`}
      >
        {article.title}
      </span>
    </div>
  );
};

export default ArticleText;
