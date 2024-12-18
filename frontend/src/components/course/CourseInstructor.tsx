import { Link } from 'react-router-dom';

interface CourseInstructorProps {
  teacherId: string;
  teacherName: string;
}

const CourseInstructor: React.FC<CourseInstructorProps> = ({ teacherId, teacherName }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className='text-lg font-semibold mb-4'>Instructor</h2>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-xl text-gray-600">{teacherName[0]}</span>
      </div>
      <div>
        <Link
          to={`/teacher/${teacherId}`}
          className='text-base font-medium text-gray-900 hover:text-blue-600 hover:underline'
        >
          {teacherName}
        </Link>
        <p className="text-sm text-gray-600">Course Instructor</p>
      </div>
    </div>
  </div>
);

export default CourseInstructor;
