import { Separator } from "@/components/common/ui/separator";
import { Skeleton } from "@/components/common/ui/skeleton";

const ArticleDetailSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />

          <div className="flex items-center gap-6 pt-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        <Separator className="my-6" />

        <div className="pt-6 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailSkeleton;
