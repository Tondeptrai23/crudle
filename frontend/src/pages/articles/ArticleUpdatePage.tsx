import ArticleForm from '@/components/articles/ArticleForm';
import { useArticleDetail, useUpdateArticle } from '@/hooks/api/useArticleApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { ArticleRequest } from '@/types/article';
import { Role } from '@/types/enums';
import { Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleUpdatePage: React.FC = () => {
  const { role } = useAuth();
  if (role !== Role.Teacher) {
    throw new Error('Only teachers can update articles');
  }

  const { courseId, articleId } = useParams();
  if (!courseId || !articleId) {
    throw new Error('Missing parameter in the URL');
  }

  const { toast } = useToast();
  const updateArticle = useUpdateArticle(courseId);
  const navigate = useNavigate();
  const {
    data: article,
    isLoading,
    isError,
  } = useArticleDetail('teacher', { courseId, articleId });

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (isError || !article) {
    throw new Error('Error loading article');
  }

  const onSubmit = async (request: ArticleRequest) => {
    updateArticle.mutate(
      {
        articleId,
        data: request,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Update article successfully',
          });
          navigate(`/course/${courseId}`);
        },
        onError: () => {
          throw new Error('Failed to update article');
        },
      },
    );
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='mx-auto'>
        <ArticleForm article={article} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ArticleUpdatePage;
