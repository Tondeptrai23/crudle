import { Button } from '@/components/common/ui/button';
import Student from '@/types/student';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseStudentsProps {
  students: Student[];
}

const CourseStudents: React.FC<CourseStudentsProps> = ({ students }) => {
  const ITEMS_PER_PAGE = 5;
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const navigate = useNavigate();

  const hasMore = displayCount < students.length;
  const displayedStudents = students.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, students.length));
  };

  return (
    <div className='mt-6 rounded-lg border p-4'>
      <h3 className='mb-4 font-semibold'>
        Students Enrolled ({students.length})
      </h3>

      {students.length === 0 ? (
        <p className='text-sm text-gray-500'>No students enrolled yet</p>
      ) : (
        <>
          <div className='space-y-2'>
            {displayedStudents.map((student) => (
              <Button
                key={student.id}
                variant='ghost'
                className='w-full justify-start text-left hover:bg-gray-50'
                onClick={() => navigate(`/student/${student.id}`)}
              >
                {student.fullname}
              </Button>
            ))}
          </div>

          {hasMore && (
            <Button
              variant='outline'
              onClick={handleLoadMore}
              className='mt-4 w-full'
            >
              Load More ({students.length - displayCount} remaining)
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default CourseStudents;
