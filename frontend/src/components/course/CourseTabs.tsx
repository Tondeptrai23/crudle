import ArticleList from '@/components/articles/ArticleList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/tabs"

type CourseTab = 'articles' | 'assignments';

interface CourseTabsProps {
  activeTab: CourseTab;
  setActiveTab: (tab: CourseTab) => void;
  courseId: string;
}

const CourseTabs: React.FC<CourseTabsProps> = ({
  activeTab,
  setActiveTab,
  courseId,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CourseTab)}>
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <ArticleList courseId={courseId} />
        </TabsContent>
        <TabsContent value="assignments">
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-medium">Coming Soon</p>
            <p className="text-sm">Assignments feature is under development</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseTabs;
