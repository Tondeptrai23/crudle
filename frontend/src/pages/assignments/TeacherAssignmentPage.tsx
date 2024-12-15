import AssignmentCard from '@/components/assignments/AssignmentCard';
import { useAssignments } from '@/hooks/api/useAssignmentApi';
import { UrlExtractor } from '@/utils/helper';

const TeacherAssignmentPage = () => {
  let { data: assignments } = useAssignments(UrlExtractor.extractCourseId());

  if (!assignments) {
    assignments = [];
  }

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <div className='w-72 rounded-md border-2 border-slate-800 text-center'>
        Sidebar
      </div>
      <div className='container m-8'>
        <h1 className='my-8 text-2xl font-semibold'>Assignments</h1>

        <div className='ml-4 grid grid-cols-2 gap-4'>
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.assignmentId}
              assignment={assignment}
              onDelete={() => {
                console.log('Delete assignment' + assignment.assignmentId);
              }}
              onEdit={() => {
                console.log('Edit assignment' + assignment.assignmentId);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignmentPage;
