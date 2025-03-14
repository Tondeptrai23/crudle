import { Link } from 'react-router-dom';

interface CourseHeaderProps {
  courseName: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ courseName }) => (
  <div className='mb-6 flex items-center gap-2 text-sm text-gray-600'>
    <Link to='/course' className='hover:text-gray-900'>
      Courses
    </Link>
    <span>/</span>
    <span className='text-gray-900'>{courseName}</span>
  </div>
);

export default CourseHeader;
