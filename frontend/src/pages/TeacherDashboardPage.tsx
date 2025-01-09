import React, { useState } from 'react';
import { Calendar } from '@/components/common/ui/calendar';
import EventCard from '@/components/dashboard/eventCard';
import { EventCardSkeleton } from '@/components/dashboard/EventCardSkeleton';
import Sidebar from '@/components/nav/Sidebar';
import { useUpcomingAssignments } from '@/hooks/api/useTeacherApi';

export const TeacherDashboardPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || new Date());
  };

  const {
    data: assignments,
    isLoading,
    error,
  } = useUpcomingAssignments(selectedDate);

  const eventDates =
    assignments?.map((assignment) => new Date(assignment.dueDate)) ?? [];

  const filteredAssignments = assignments?.filter(
    (assignment) =>
      new Date(assignment.dueDate).toDateString() ===
      selectedDate.toDateString(),
  );

  if (error) {
    throw error;
  }

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <Sidebar />
      <div className='container m-8 flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold'>Upcoming events</h2>
        <div className='flex flex-row gap-12'>
          <div className='grid w-full gap-2'>
            {isLoading && (
              <>
                <EventCardSkeleton />
                <EventCardSkeleton />
              </>
            )}
            {!isLoading && filteredAssignments?.length === 0 && (
              <div className='flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  No assignments due on {selectedDate.toDateString()}
                </h3>
                <p className='text-sm text-gray-500'>
                  Select another date to view assignments
                </p>
              </div>
            )}
            {filteredAssignments?.map((assignment) => (
              <EventCard
                key={assignment.assignmentId}
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
              onSelect={handleDateSelect}
              className='rounded-md border'
              modifiers={{ hasEvent: eventDates }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: 'bold',
                },
              }}
              components={{
                DayContent: ({ date }) => (
                  <div className='relative flex flex-col items-center pb-2'>
                    <span className=''>{date.getDate()}</span>{' '}
                    {eventDates.some(
                      (eventDate) =>
                        eventDate.toDateString() === date.toDateString(),
                    ) && (
                      <div className='absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary' />
                    )}
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
