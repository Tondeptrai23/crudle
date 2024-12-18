import { useArticles, useReadArticle } from '@/hooks/api/useArticleApi';
import { Skeleton } from '@/components/common/ui/skeleton';
import ArticleCard from './ArticleCard';
import useAuth from '@/hooks/useAuth';
import { Article } from '@/types/article';
import { useState } from 'react';
import { Button } from '@/components/common/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import ArticleText from './ArticleText';

type ArticlesDisplayStyle = 'card' | 'text';

const ArticleList = ({ courseId }: { courseId: string }) => {
  const { role } = useAuth();
  const [displayStyle, setDisplayStyle] = useState<ArticlesDisplayStyle>('card');
  const { data: articles, isLoading } = useArticles(role, { courseId }, {
    page: 1,
    pageSize: 10,
    filters: {},
    // sort: { key: 'order', direction: 'asc' },
    sort: { key: 'createdAt', direction: 'asc' },
  });
  const readArticle = useReadArticle(courseId);

  const handleReadArticle = async (article: Article) => {
    if (role.toLowerCase() !== 'student' || article.isRead) return;
    await readArticle.mutateAsync({ articleId: article.id });
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
      <div className='flex justify-end mb-4'>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDisplayStyle(displayStyle === 'card' ? 'text' : 'card')}
        >
          {displayStyle === 'card' ? <List /> : <LayoutGrid />}
        </Button>
      </div>
      <div className='space-y-4 flex flex-col gap-1'>
        {articles?.data.map((article) => (
          displayStyle === 'card' ? (
            <ArticleCard 
              key={article.id}
              article={article}
              courseId={courseId}
              onRead={() => handleReadArticle(article)}
            />
          ) : (
            <ArticleText
              key={article.id}
              article={article}
              courseId={courseId}
              onRead={() => handleReadArticle(article)}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
