import ArticleCard from '@/components/articles/ArticleCard';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Skeleton } from '@/components/common/ui/skeleton';
import { useArticles, useReadArticle } from '@/hooks/api/useArticleApi';
import useAuth from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { Article } from '@/types/article';
import { Role } from '@/types/enums';
import { LayoutGrid, List, Package, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleText from './ArticleText';

type ArticlesDisplayStyle = 'card' | 'text';

const EmptyState = () => (
  <div className='py-12 text-center'>
    <Package className='mx-auto h-12 w-12 text-gray-400' />
    <h3 className='mt-2 text-sm font-semibold text-gray-900'>No articles</h3>
    <p className='mt-1 text-sm text-gray-500'>There are no articles.</p>
  </div>
);

const ArticleList = ({ courseId }: { courseId: string }) => {
  const { role } = useAuth();
  const [displayStyle, setDisplayStyle] =
    useState<ArticlesDisplayStyle>('card');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const [page, setPage] = useState(1);

  const pageSize = useMemo(
    () => (displayStyle === 'card' ? 10 : 50),
    [displayStyle],
  );

  const { data: articles, isLoading } = useArticles(
    role,
    { courseId },
    {
      page,
      pageSize,
      filters: {
        title: debouncedSearch,
      },
      sort: { key: 'order', direction: 'asc' },
    },
  );
  const readArticle = useReadArticle(courseId);

  const handleReadArticle = async (article: Article) => {
    if (role !== Role.Student || article.isRead) return;
    readArticle.mutate({ articleId: article.id });
  };

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
      <div className='mb-6 flex items-center gap-4'>
        <div className='flex-1'>
          <Input
            type='search'
            placeholder='Search articles...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-sm'
          />
        </div>
        <div className='flex items-center gap-4'>
          {role === Role.Teacher && (
            <Link
              to={`/course/${courseId}/article/new`}
              className='inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90'
            >
              <Plus className='h-4 w-4' />
              New Article
            </Link>
          )}
          <Button
            variant='outline'
            size='icon'
            onClick={() =>
              setDisplayStyle(displayStyle === 'card' ? 'text' : 'card')
            }
          >
            {displayStyle === 'card' ? <List /> : <LayoutGrid />}
          </Button>
        </div>
      </div>
      {articles?.data.length === 0 ? (
        <EmptyState />
      ) : displayStyle === 'card' ? (
        <div className='flex flex-col gap-1 space-y-4'>
          {articles?.data.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              courseId={courseId}
              onRead={() => handleReadArticle(article)}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col space-y-2'>
          {articles?.data.map((article) => (
            <ArticleText
              key={article.id}
              article={article}
              courseId={courseId}
              onRead={() => handleReadArticle(article)}
            />
          ))}
        </div>
      )}
      {articles && articles?.totalPages > 0 && (
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-muted-foreground'>
            Showing {(page - 1) * pageSize + 1} to{' '}
            {Math.min(page * pageSize, articles.totalItems)} of{' '}
            {articles?.totalItems} articles
          </div>
          {articles.totalPages > 1 && (
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setPage((p) =>
                    articles && articles.totalPages
                      ? Math.min(articles.totalPages, p + 1)
                      : p + 1,
                  )
                }
                disabled={page === articles?.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
