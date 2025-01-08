import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table';
import { useSubmissions } from '@/hooks/api/useAssignmentApi';

interface SubmissionsTableProps {
	courseId: number;
	assignmentId: number;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ courseId, assignmentId }) => {
	const { data: submissions, isLoading } = useSubmissions(courseId, assignmentId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead className='w-[100px]'>Score</TableHead>
          <TableHead className='w-[150px]'>Started At</TableHead>
          <TableHead className='w-[150px]'>Submitted At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
				{submissions?.map((submission) => (
					<TableRow key={submission.submissionId}>
						<TableCell>{submission.studentName}</TableCell>
						<TableCell>{submission.score}</TableCell>
						<TableCell>{submission.startedAt?.toLocaleDateString()}</TableCell>
						<TableCell>{submission.submittedAt?.toLocaleDateString()}</TableCell>
					</TableRow>
				))}
			</TableBody>
    </Table>
  );
};

export default SubmissionsTable;
