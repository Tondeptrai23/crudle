import { Button } from '@/components/common/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/ui/dialog';
import { useDeleteArticle } from '@/hooks/api/useArticleApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { Article } from '@/types/article';
import { Role } from '@/types/enums';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`article/${article.id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteArticle.mutate(article.id, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Delete article successfully',
        });
        setShowDeleteDialog(false);
      },
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRead();
    navigate(`article/${article.id}`);
  };

  return (
    <>
      <div
        className='flex cursor-pointer items-center gap-1 rounded px-2 hover:bg-gray-100'
        onClick={handleClick}
      >
        {!isStudent && (
          <>
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6'
              onClick={handleEditClick}
            >
              <Pencil className='h-3 w-3' />
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
          className={`${
            isStudent && !article.isRead ? 'font-bold' : 'font-normal'
          }`}
        >
          {article.title}
        </span>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{article.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleText;
