import { Skeleton } from '@/components/common/ui/skeleton';
import { useRoleBasedCourses } from '@/hooks/api/useCourseApi';
import useAuth from '@/hooks/useAuth';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LoadingSkeleton = () => (
  <div className='space-y-3'>
    {[1, 2, 3].map((i) => (
      <div key={i} className='flex items-center gap-2 p-2'>
        <Skeleton className='h-5 w-5 rounded' />
        <Skeleton className='h-4 w-32' />
      </div>
    ))}
  </div>
);

const Sidebar = () => {
  const { role } = useAuth();
  const { data: items, isLoading, error } = useRoleBasedCourses(role);
  const { courseId } = useParams();
  const [selectedId, setSelectedId] = useState<string>(courseId ?? '');
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setSelectedId(id);
    navigate(`/course/${id}`);
  };

  if (error || !items) {
    throw error || new Error('Error loading courses');
  }

  return (
    <div className='-ml-4 w-72 rounded-md border border-gray-200 bg-white'>
      <nav className='space-y-2 p-4'>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors ${
                selectedId === item.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSelect(item.id)}
            >
              <Star
                className={selectedId === item.id ? 'fill-current' : ''}
                size={20}
              />
              <span>{item.name}</span>
            </div>
          ))
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
