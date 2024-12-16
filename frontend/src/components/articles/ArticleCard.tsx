import { Card, CardContent, CardHeader } from '@/components/common/ui/card.tsx';
import useAuth from '@/hooks/useAuth';
import { Article } from '@/types/article.ts';

const ArticleCard = ({ article }: { article: Article }) => {
  const { role } = useAuth();

  return (
    <Card
      key={article.id}
      className="flex flex-col transition-all hover:shadow-md bg-primary-50"
    >
      <CardHeader className='py-3'>
        <div className='flex items-center gap-3'>
          {(role === 'student') ? <div
            className={`h-2 w-2 rounded-full ${
              article.isRead ? 'bg-muted' : 'bg-primary'
            }`}
          /> : null}
          <h2
            className={`text-xl ${
              article.isRead ? 'text-muted-foreground' : 'font-semibold'
            }`}
          >
            {article.title}
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <p className='line-clamp-2 text-muted-foreground'>{article.summary}</p>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;