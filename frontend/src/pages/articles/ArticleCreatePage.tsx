import ArticleForm from '@/components/articles/ArticleForm';
import { useCreateArticle } from '@/hooks/api/useArticleApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { ArticleRequest } from '@/types/article';
import { Role } from '@/types/enums';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleCreatePage: React.FC = () => {
  const { role } = useAuth();
  if (role !== Role.Teacher) {
    throw new Error('Only teachers can create articles');
  }

  const { toast } = useToast();
  const { courseId } = useParams();
  const navigate = useNavigate();

  if (!courseId) {
    throw new Error('Missing courseId parameter');
  }
  const createArticle = useCreateArticle(courseId);

  const onSubmit = async (request: ArticleRequest) => {
    createArticle.mutate(request, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Create article successfully',
        });
        navigate(`/course/${courseId}`);
      },
      onError: () => {
        throw new Error('Failed to create article');
      },
    });
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='mx-auto'>
        <ArticleForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ArticleCreatePage;
