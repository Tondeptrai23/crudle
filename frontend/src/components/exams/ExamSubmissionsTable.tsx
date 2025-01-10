import { Badge } from '@/components/common/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table';
import { useExamSubmissions, useGetExam } from '@/hooks/api/useExamApi';
import useAuth from '@/hooks/useAuth';
import { ExamSubmissionStatus } from '@/types/exam';
import { Ban, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ExamSubmissionsTableProps {
  courseId: string;
  examId: string;
}

const ExamSubmissionsTable: React.FC<ExamSubmissionsTableProps> = ({
  courseId,
  examId,
}) => {
  const { role } = useAuth();
  const now = new Date();
  const exam = useGetExam(Number(courseId), Number(examId), role);
  const examEndDate = exam.data
    ? new Date(
        new Date(exam.data.startDate).getTime() +
          exam.data.duration * 60 * 1000,
      )
    : null;
  const canViewSubmission = examEndDate && now > examEndDate;
  const { data: submissions, isLoading } = useExamSubmissions(
    courseId,
    examId,
    role,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getStatusBadge = (status: ExamSubmissionStatus) => {
    switch (status) {
      case ExamSubmissionStatus.IN_PROGRESS:
        return (
          <Badge
            variant='secondary'
            className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
          >
            <Clock className='mr-1 h-3 w-3' />
            In Progress
          </Badge>
        );
      case ExamSubmissionStatus.DONE:
        return (
          <Badge
            variant='secondary'
            className='bg-green-100 text-green-800 hover:bg-green-100'
          >
            <CheckCircle2 className='mr-1 h-3 w-3' />
            Done
          </Badge>
        );
      default:
        return (
          <Badge
            variant='secondary'
            className='bg-gray-100 text-gray-800 hover:bg-gray-100'
          >
            <Ban className='mr-1 h-3 w-3' />
            Not Started
          </Badge>
        );
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead className='w-[150px]'>Status</TableHead>
          <TableHead className='w-[50px]'>Score</TableHead>
          <TableHead className='w-[50px]'>Percentage</TableHead>
          <TableHead className='w-[120px]'>Started</TableHead>
          <TableHead className='w-[120px]'>Submitted</TableHead>
          <TableHead className='w-[100px]'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions?.map((submission) => (
          <TableRow key={submission.submissionId}>
            <TableCell>{submission.studentName}</TableCell>
            <TableCell>{getStatusBadge(submission.status)}</TableCell>
            <TableCell className='text-right tabular-nums'>
              {submission.score === null ? '0' : submission.score} /{' '}
              {exam.data?.questions?.length ?? '?'}
            </TableCell>
            <TableCell className='text-right tabular-nums'>
              {submission.score === null || !exam.data?.questions
                ? 'N/A'
                : (
                    (submission.score / exam.data.questions.length) *
                    100
                  ).toFixed(2) + '%'}
            </TableCell>
            <TableCell className='text-right tabular-nums'>
              <div>{submission.startedAt?.toLocaleDateString('en-GB')}</div>
              <div>{submission.startedAt?.toLocaleTimeString('en-GB')}</div>
            </TableCell>
            <TableCell className='text-right tabular-nums'>
              <div>{submission.submittedAt?.toLocaleDateString('en-GB')}</div>
              <div>{submission.submittedAt?.toLocaleTimeString('en-GB')}</div>
            </TableCell>
            <TableCell className='text-center underline hover:text-primary'>
              {submission.status === ExamSubmissionStatus.DONE &&
                canViewSubmission && (
                  <Link
                    to={`/course/${courseId}/exam/${examId}/submission/${submission.submissionId}`}
                  >
                    View
                  </Link>
                )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExamSubmissionsTable;
