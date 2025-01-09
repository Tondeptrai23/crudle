import { ExamProvider } from '@/components/exams/ExamContext';
import ExamDetail from '@/components/exams/ExamDetail';

const ExamDetailPage = () => {
  return (
    <ExamProvider>
      <ExamDetail />
    </ExamProvider>
  );
};

export default ExamDetailPage;
