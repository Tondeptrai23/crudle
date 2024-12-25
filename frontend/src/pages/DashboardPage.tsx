import React, { useState } from 'react';
import { Calendar } from '@/components/common/ui/calendar';
import EventCard from '@/components/dashboard/eventCard'; // Adjust the import path as necessary
import { useUpcomingAssignments } from '@/hooks/api/useStudentApi';
import { EventCardSkeleton } from '@/components/dashboard/EventCardSkeleton';

export const DashboardPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const {
    data: assignments,
    isLoading,
    error,
  } = useUpcomingAssignments(selectedDate);

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <div className='w-72 rounded-md border-2 border-slate-800 text-center'>
        Sidebar
      </div>
      <div className='container m-8 flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold'>Upcoming events</h2>
        <div className='flex flex-row gap-12'>
          <div className='grid w-full gap-2'>
            {isLoading && (
              <>
                <EventCardSkeleton />
                <EventCardSkeleton />
              </>
            )}{' '}
            {assignments?.map((assignment) => (
              <EventCard
                assignmentName={assignment.name}
                dueTime={assignment.dueDate}
                courseName={assignment.courseName}
                courseId={assignment.courseId}
                assignmentId={assignment.assignmentId}
              />
            ))}
          </div>
          <div>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={setSelectedDate}
              className='rounded-md border'
            />
          </div>
        </div>
        <h2 className='text-2xl font-semibold'>Results</h2>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
              >
                Assignment ID
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
              >
                Assignment Name
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
              >
                Grade
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            <tr>
              <td className='whitespace-nowrap px-6 py-4'>CS101</td>
              <td className='whitespace-nowrap px-6 py-4'>
                Introduction to Computer Science
              </td>
              <td className='whitespace-nowrap px-6 py-4'>A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
