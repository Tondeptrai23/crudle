import ArticleDetailSkeleton from '@/components/articles/ArticleDetailSkeleton';
import { Button } from '@/components/common/ui/button';
import { Separator } from '@/components/common/ui/separator';
import { useArticleDetail } from '@/hooks/api/useArticleApi';
import useAuth from '@/hooks/useAuth';
import { Role } from '@/types/enums';
import { CalendarDays, Clock, Edit, Undo2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleDetailPage: React.FC = () => {
  const { articleId, courseId } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  if (!articleId || !courseId) {
    throw new Error('Missing articleId or courseId in URL params');
  }

  const {
    data: article,
    isLoading,
    error,
  } = useArticleDetail(role, {
    courseId: courseId,
    articleId: articleId,
  });

  if (isLoading) return <ArticleDetailSkeleton />;

  if (error || !article) throw new Error('Error loading article');

  return (
    <div className='container mx-auto p-6'>
      <div className='mx-auto max-w-4xl'>
        <div className='flex items-center justify-between'>
          <div className='space-y-4'>
            <h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>
              {article.title}
            </h1>

            <p className='text-lg text-muted-foreground'>{article.summary}</p>

            <div className='flex items-center gap-6 pt-2 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'>
                <CalendarDays className='h-4 w-4' />
                <span>
                  Created: {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                <span>
                  Last update:{' '}
                  {new Date(article.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {role === Role.Teacher && (
              <Button
                variant='default'
                onClick={() =>
                  navigate('../..?tab=articles', { relative: 'path' })
                }
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit Article
              </Button>
            )}
            <Button
              variant='outline'
              onClick={() =>
                navigate('../..?tab=articles', { relative: 'path' })
              }
            >
              <Undo2 className='mr-2 h-4 w-4' />
              Return
            </Button>
          </div>
        </div>

        <Separator className='my-6' />

        <div className='pt-6'>
          <div
            className='prose prose-neutral max-w-none'
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
