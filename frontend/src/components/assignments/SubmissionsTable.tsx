import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table';
import { useSubmissions } from '@/hooks/api/useAssignmentApi';
import { Link } from 'react-router-dom';

interface SubmissionsTableProps {
	courseId: number;
	assignmentId: number;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ courseId, assignmentId }) => {
	const { data: submissions, isLoading } = useSubmissions(courseId, assignmentId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(submissions);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead className='w-[50px]'>Score</TableHead>
          <TableHead className='w-[150px]'>Started</TableHead>
          <TableHead className='w-[150px]'>Submitted</TableHead>
					<TableHead className='w-[100px]'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions?.map((submission) => (
          <TableRow key={submission.submissionId}>
            <TableCell>{submission.studentName}</TableCell>
            <TableCell className='text-center tabular-nums'>{submission.score}</TableCell>
            <TableCell className='tabular-nums'>
              <div>{submission.startedAt?.toLocaleDateString('en-GB')}</div>
              <div>{submission.startedAt?.toLocaleTimeString('en-GB')}</div>
            </TableCell>
            <TableCell className='tabular-nums'>
              <div>{submission.submittedAt?.toLocaleDateString('en-GB')}</div>
							<div>{submission.submittedAt?.toLocaleTimeString('en-GB')}</div>
            </TableCell>
						<TableCell className='text-center underline hover:text-primary'>
							<Link to="/">View</Link>
						</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubmissionsTable;
