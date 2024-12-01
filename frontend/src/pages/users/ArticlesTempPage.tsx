import React from "react";
import { useArticles } from "@/hooks/api/useCourseApi";
import { Card, CardHeader, CardContent } from "@/components/common/ui/card";
import { Badge } from "@/components/common/ui/badge";
import { Skeleton } from "@/components/common/ui/skeleton";
import { ScrollArea } from "@/components/common/ui/scroll-area";
import { BookOpen, BookX } from "lucide-react";

const ArticlesTempPage: React.FC = () => {
  const { data: articles, isLoading, error } = useArticles("1");

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <Skeleton className="h-12 w-[200px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-red-50">
          <CardContent className="p-6 text-red-600">
            Error loading articles
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Course Articles</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {articles?.data?.filter(a => a.isRead).length} Read
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BookX className="h-4 w-4" />
            {articles?.data?.filter(a => !a.isRead).length} Unread
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {articles?.data
            .map((article) => (
            <Card 
              key={article.id} 
              className={`flex flex-col hover:shadow-md transition-all ${
                !article.isRead ? 'bg-primary-50' : 'bg-white'
              }`}
            >
              <CardHeader className="py-3">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    article.isRead ? 'bg-muted' : 'bg-primary animate-pulse'
                  }`} />
                  <h2 className={`text-xl ${
                    article.isRead ? 'text-muted-foreground' : 'font-semibold'
                  }`}>
                    {article.title}
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-muted-foreground line-clamp-2">{article.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ArticlesTempPage;