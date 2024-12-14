import { Card, CardContent, CardHeader } from '@/components/common/ui/card.tsx';
import { Article } from '@/types/article.ts';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Card
      key={article.id}
      className={`flex flex-col transition-all hover:shadow-md ${
        !article.isRead ? 'bg-primary-50' : 'bg-white'
      }`}
    >
      <CardHeader className='py-3'>
        <div className='flex items-center gap-3'>
          <div
            className={`h-2 w-2 rounded-full ${
              article.isRead ? 'bg-muted' : 'bg-primary'
            }`}
          />
          <h2
            className={`text-xl ${
              article.isRead ? 'text-muted-foreground' : 'font-semibold'
            }`}
          >
            {article.title}
          </h2>
        </div>
      </CardHeader>
      <CardContent className='py-2'>
        <p className='line-clamp-2 text-muted-foreground'>{article.summary}</p>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;