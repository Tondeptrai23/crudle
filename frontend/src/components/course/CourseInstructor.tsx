import { Link } from 'react-router-dom';

interface CourseInstructorProps {
  teacherId: string;
  teacherName: string;
}

const CourseInstructor: React.FC<CourseInstructorProps> = ({
  teacherId,
  teacherName,
}) => (
  <div className='rounded-lg bg-white p-6 shadow-sm'>
    <h2 className='mb-4 text-lg font-semibold'>Instructor</h2>
    <div className='flex items-center gap-4'>
      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200'>
        <span className='text-xl text-gray-600'>{teacherName[0]}</span>
      </div>
      <div>
        <Link
          to={`/teacher/${teacherId}`}
          className='text-base font-medium text-gray-900 hover:text-blue-600 hover:underline'
        >
          {teacherName}
        </Link>
        <p className='text-sm text-gray-600'>Course Instructor</p>
      </div>
    </div>
  </div>
);

export default CourseInstructor;
