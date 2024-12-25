import ArticleList from '@/components/articles/ArticleList';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/ui/tabs';
import AssignmentList from '../assignments/AssignmentList';

type CourseTab = 'articles' | 'assignments';

interface CourseTabsProps {
  activeTab: CourseTab;
  setActiveTab: (tab: CourseTab) => void;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className='rounded-lg bg-white p-6 shadow-sm'>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as CourseTab)}
      >
        <TabsList>
          <TabsTrigger value='articles'>Articles</TabsTrigger>
          <TabsTrigger value='assignments'>Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value='articles'>
          <ArticleList />
        </TabsContent>
        <TabsContent value='assignments'>
          <AssignmentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseTabs;