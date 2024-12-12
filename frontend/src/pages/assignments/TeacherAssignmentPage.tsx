import AssignmentCard from '@/components/assignments/AssignmentCard';
import Assignment from '@/types/assignment';

const TeacherAssignmentPage = () => {
  var assignments: Assignment[] = [
    {
      assignmentId: 'a1',
      courseId: 'c1',
      name: 'Assignment 1',
      content: 'Content for assignment 1',
      duedAt: new Date('2023-12-01T00:00:00Z'),
      createdAt: new Date('2023-11-01T00:00:00Z'),
      updatedAt: new Date('2023-11-15T00:00:00Z'),
      canViewScore: true,
      canRetry: false,
      type: 'file',
    },
    {
      assignmentId: 'a2',
      courseId: 'c1',
      name: 'Assignment 2',
      content: 'Content for assignment 2',
      duedAt: new Date('2023-12-15T00:00:00Z'),
      createdAt: new Date('2023-11-05T00:00:00Z'),
      updatedAt: new Date('2023-11-20T00:00:00Z'),
      canViewScore: true,
      canRetry: true,
      type: 'questions',
    },
    {
      assignmentId: 'a3',
      courseId: 'c2',
      name: 'Assignment 3',
      content: 'Content for assignment 3',
      duedAt: new Date('2023-12-20T00:00:00Z'),
      createdAt: new Date('2023-11-10T00:00:00Z'),
      updatedAt: new Date('2023-11-25T00:00:00Z'),
      canViewScore: false,
      canRetry: false,
      type: 'file',
    },
    {
      assignmentId: 'a4',
      courseId: 'c2',
      name: 'Assignment 4',
      content: 'Content for assignment 4',
      duedAt: new Date('2023-12-25T00:00:00Z'),
      createdAt: new Date('2023-11-15T00:00:00Z'),
      updatedAt: new Date('2023-11-30T00:00:00Z'),
      canViewScore: true,
      canRetry: true,
      type: 'questions',
    },
    {
      assignmentId: 'a5',
      courseId: 'c3',
      name: 'Assignment 5',
      content: 'Content for assignment 5',
      duedAt: new Date('2023-12-30T00:00:00Z'),
      createdAt: new Date('2023-11-20T00:00:00Z'),
      updatedAt: new Date('2023-12-05T00:00:00Z'),
      canViewScore: false,
      canRetry: true,
      type: 'file',
    },
  ];
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
