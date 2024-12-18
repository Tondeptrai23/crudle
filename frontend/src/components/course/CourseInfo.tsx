import Course from '@/types/course';

interface CourseInfoProps {
  course: Course;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h1 className='text-2xl font-bold mb-4'>{course.name}</h1>
    <div className="flex flex-col gap-4 mb-4">
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        {course.code}
      </span>
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {new Date(course.startDate).toLocaleDateString()}
      </span>
    </div>
    <div className="prose max-w-none">
      <p className="text-sm text-gray-600">{course.description}</p>
    </div>
  </div>
);

export default CourseInfo;
