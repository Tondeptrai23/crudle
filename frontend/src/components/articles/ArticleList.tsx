import { useArticles, useReadArticle } from '@/hooks/api/useArticleApi';
import { Skeleton } from '@/components/common/ui/skeleton';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import useAuth from '@/hooks/useAuth';
import { Article } from '@/types/article';

const ArticleList = ({ courseId }: { courseId: string }) => {
  // TODO: Add pagination, sorting, and filtering
  const { role } = useAuth();
  const { data: articles, isLoading } = useArticles(role, { courseId });
  const readArticle = useReadArticle();

  const handleReadArticle = async (article: Article) => {
    if (role.toLowerCase() !== 'student' || article.isRead) return;
    await readArticle.mutateAsync({ courseId, articleId: article.id });
  }

  if (isLoading) {
    return (
      <div className='container mx-auto space-y-4 p-6'>
        <div className='flex flex-col gap-4'>
          {[1, 2].map((i) => (
            <Skeleton key={i} className='h-[100px] w-full' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='space-y-4 flex flex-col gap-2'>
        {articles?.data.map((article) => (
          <Link 
            to={`article/${article.id}`}
            onClick={() => {handleReadArticle(article)}} 
            key={article.id} >
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
