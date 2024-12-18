import { Card, CardContent, CardHeader } from '@/components/common/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/ui/button';
import useAuth from '@/hooks/useAuth';
import { Article } from '@/types/article';
import { Role } from '@/types/enums';
import { useNavigate } from 'react-router-dom';
import { useDeleteArticle } from '@/hooks/api/useArticleApi';
import { useToast } from '@/hooks/use-toast';

interface ArticleCardProps {
  article: Article;
  courseId: string;
  onRead: () => void;
}

const ArticleCard = ({ article, courseId, onRead }: ArticleCardProps) => {
  const { role } = useAuth();
  const { toast } = useToast();
  const deleteArticle = useDeleteArticle(courseId);
  const navigate = useNavigate();

  const onDelete = (e: React.MouseEvent) => {
    console.log(article)
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

  const handleClick = () => {
    onRead();
    navigate(`article/${article.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`article/${article.id}/edit`);
  };

  return (
    <Card
      key={article.id}
      className="flex flex-col transition-all hover:shadow-md bg-primary-50 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className='py-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {(role === 'student') ? <div
              className={`h-2 w-2 rounded-full ${
                article.isRead ? 'bg-muted' : 'bg-primary'
              }`}
            /> : null}
            <div
              className={`text-xl ${
                article.isRead ? 'text-muted-foreground' : 'font-semibold'
              }`}
            >
              {article.title}
            </div>
          </div>
          {(role === Role.Teacher || role === Role.Admin) && (
            <div className="flex gap-2" onClick={e => e.stopPropagation()}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={handleEditClick}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive" 
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className='line-clamp-2 text-muted-foreground'>{article.summary}</div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;