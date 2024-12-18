import { useArticles, useReadArticle } from '@/hooks/api/useArticleApi';
import { Skeleton } from '@/components/common/ui/skeleton';
import { Input } from '@/components/common/ui/input';
import ArticleCard from './ArticleCard';
import { Article } from '@/types/article';
import { useState, useMemo } from 'react';
import { Button } from '@/components/common/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import ArticleText from './ArticleText';
import { Link } from 'react-router-dom';
import { Role } from '@/types/enums';
import useAuth from '@/hooks/useAuth';

type ArticlesDisplayStyle = 'card' | 'text';

const EmptyState = () => (
  <div className="text-center py-12">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
    <h3 className="mt-2 text-sm font-semibold text-gray-900">No articles</h3>
    <p className="mt-1 text-sm text-gray-500">
      There are no articles in this course yet.
    </p>
  </div>
);

const ArticleList = ( { courseId } : { courseId : string }) => {
  const { role } = useAuth();
  const [displayStyle, setDisplayStyle] = useState<ArticlesDisplayStyle>('card');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const pageSize = useMemo(() => displayStyle === 'card' ? 10 : 50, [displayStyle]);

  const { data: articles, isLoading } = useArticles(role, { courseId }, {
    page,
    pageSize,
    filters: { 
      title: search,
      summary: search,
      // content: search, 
    },
    sort: { key: 'order', direction: 'asc' },
  });
  const readArticle = useReadArticle(courseId);

  const handleReadArticle = async (article: Article) => {
    if (role !== Role.Student || article.isRead) return;
    readArticle.mutate({ articleId: article.id });
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
      <div className='flex items-center mb-6 gap-4'>
        <div className='flex-1'>
          <Input
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className='flex items-center gap-4'>
          {role === Role.Teacher && (
            <Link
              to={`/course/${courseId}/article/new`}
              className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium'
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Article
            </Link>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDisplayStyle(displayStyle === 'card' ? 'text' : 'card')}
          >
            {displayStyle === 'card' ? <List /> : <LayoutGrid />}
          </Button>
        </div>
      </div>
      {articles?.data.length === 0 ? (
        <EmptyState />
      ) : (
        displayStyle === 'card' ? (
          <div className='space-y-4 flex flex-col gap-1'>
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
          <div className='space-y-2 flex flex-col'>
            {articles?.data.map((article) => (
              <ArticleText
                key={article.id}
                article={article}
                courseId={courseId}
                onRead={() => handleReadArticle(article)}
              />
            ))}
          </div>
        )
      )}
      {articles && articles.totalPages && articles?.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, articles.totalItems)} of {articles?.totalItems} articles
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => (articles && articles.totalPages) ? Math.min(articles.totalPages, p + 1) : p + 1)}
              disabled={page === articles?.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )} 
    </div>
  );
};

export default ArticleList;
