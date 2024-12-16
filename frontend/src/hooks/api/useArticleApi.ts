import ArticleService from "@/services/ArticleService";
import { ArticleRequest } from "@/types/article";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const articleService = new ArticleService();
const articleKeys = {
  articles: (courseId: string) => ['courses', courseId, 'articles'],
  detail: (courseId: string, articleId: string) => ['courses', courseId, 'articles', articleId],
}

export const useArticles = (role: string, { courseId } : { courseId: string}) => {
  // TODO: Add pagination, sorting, and filtering
  const queryFn = role === 'Student'
    ? () => articleService.getArticlesByStudent(courseId, {})
    : () => articleService.getArticlesByTeacher(courseId, {});

  return useQuery({
    queryKey: articleKeys.articles(courseId),
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export const useArticleDetail = (role: string, { courseId, articleId } : { courseId: string, articleId: string }) => {
  const queryFn = role === 'Student'
    ? () => articleService.getArticleDetailByStudent(courseId, articleId)
    : () => articleService.getArticleDetailByTeacher(courseId, articleId);

  return useQuery({
    queryKey: articleKeys.detail(courseId, articleId),
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export const useReadArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, articleId }: { courseId: string, articleId: string }) => {
      await articleService.readArticle(courseId, articleId);
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    },
  });
};

export const useCreateArticle = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ArticleRequest) => {
      await articleService.createArticle(courseId, data);
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    }
  });
}

export const useUpdateArticle = (courseId: string, articleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ArticleRequest) => {
      await articleService.updateArticle(courseId, articleId, data);
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    }
  });
}

export const useDeleteArticle = (courseId: string, articleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await articleService.deleteArticle(courseId, articleId);
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    },
  });
}