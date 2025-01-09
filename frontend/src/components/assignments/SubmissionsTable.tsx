import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table';
import { useLatestSubmissions } from '@/hooks/api/useAssignmentApi';
import { SubmissionStatus } from '@/types/submission';
import { Link } from 'react-router-dom';
import { Badge } from '../common/ui/badge';
import { Clock, CheckCircle2, Ban } from 'lucide-react';

interface SubmissionsTableProps {
	courseId: string;
	assignmentId: string;
	maxScore: number;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ courseId, assignmentId, maxScore }) => {
	const { data: submissions, isLoading } = useLatestSubmissions(
    courseId,
    assignmentId,
  );

	if (isLoading) {
		return <div>Loading...</div>;
	}

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.IN_PROGRESS:
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      case SubmissionStatus.DONE:
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Done
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Ban className="w-3 h-3 mr-1" />
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
              {submission.score === null ? '-' : (submission.score ?? 0)} /{' '}
              {maxScore}
            </TableCell>
            <TableCell className='text-right tabular-nums'>
              {submission.score === null
                ? '-'
                : (((submission.score ?? 0) / maxScore) * 100).toFixed(2)}
              %
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
              {submission.status === SubmissionStatus.DONE ? (
                <Link to='/'>View</Link>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubmissionsTable;
