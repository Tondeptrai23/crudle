import ArticleService from "@/services/ArticleService";
import { ArticleRequest } from "@/types/article";
import { QueryHookParams } from "@/types/table";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const articleService = new ArticleService();
const articleKeys = {
  articles: (courseId: string) => ['courses', courseId, 'articles', 'all'],
  detail: (courseId: string, articleId: string) => ['courses', courseId, 'articles', 'detail', articleId],
}

export const useArticles = (role: string, { courseId } : { courseId: string }, data: QueryHookParams) => {
  let { page } = data;
  const { pageSize, filters, sort } = data;
  const titleFilter = filters.title as string;
  const summaryFilter = filters.summary as string;
  const contentFilter = filters.content as string;
  const createdAtFilter = filters.createdAt as Date[];
  const updatedAtFilter = filters.updatedAt as Date[];

  if (!page || page < 1) {
    page = 1;
  }

  const serviceData = {
    page,
    size: pageSize,
    title: titleFilter,
    summary: summaryFilter,
    content: contentFilter,
    createdAtFrom: createdAtFilter?.[0]?.toDateString(),
    createdAtTo: createdAtFilter?.[1]?.toDateString(),
    updatedAtFrom: updatedAtFilter?.[0]?.toDateString(),
    updatedAtTo: updatedAtFilter?.[1]?.toDateString(),
    orderBy: sort.key ?? undefined,
    orderDirection: sort.direction || 'asc',
  };

  const queryFn = role === 'Student'
    ? () => articleService.getArticlesByStudent(courseId, serviceData)
    : () => articleService.getArticlesByTeacher(courseId, serviceData);

  return useQuery({
    queryKey: [
      ...articleKeys.articles(courseId),
      page,
      pageSize,
      titleFilter,
      summaryFilter,
      contentFilter,
      createdAtFilter,
      updatedAtFilter,
      sort
    ],
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

export const useReadArticle = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ articleId }: { articleId: string }) => {
      await articleService.readArticle(courseId, articleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    },
  });
};

export const useCreateArticle = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ArticleRequest) => {
      await articleService.createArticle(courseId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    }
  });
}

export const useUpdateArticle = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ articleId, data }: { articleId: string, data: ArticleRequest }) => {
      await articleService.updateArticle(courseId, articleId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    }
  });
}

export const useDeleteArticle = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleId: string) => {
      await articleService.deleteArticle(courseId, articleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.articles(courseId) });
    }
  });
}