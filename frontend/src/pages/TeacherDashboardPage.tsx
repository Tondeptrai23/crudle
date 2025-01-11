import { Calendar } from '@/components/common/ui/calendar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/ui/tabs';
import EventCard from '@/components/dashboard/EventCard';
import { EventCardSkeleton } from '@/components/dashboard/EventCardSkeleton';
import Sidebar from '@/components/nav/Sidebar';
import {
  useUpcomingAssignments,
  useUpcomingExams,
} from '@/hooks/api/useTeacherApi';
import React, { useState } from 'react';

export const TeacherDashboardPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<
    'all' | 'assignments' | 'exams'
  >('all');

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || new Date());
  };

  const {
    data: assignments,
    isLoading: isLoadingAssignments,
    error: assignmentsError,
  } = useUpcomingAssignments(selectedDate);

  const {
    data: exams,
    isLoading: isLoadingExams,
    error: examsError,
  } = useUpcomingExams(selectedDate);

  // Combine all event dates for calendar highlighting
  const eventDates = [
    ...(assignments?.map((assignment) => new Date(assignment.dueDate)) ?? []),
    ...(exams?.map((exam) => new Date(exam.startDate)) ?? []),
  ];

  const filteredAssignments = assignments?.filter(
    (assignment) =>
      new Date(assignment.dueDate).toDateString() ===
      selectedDate.toDateString(),
  );

  const filteredExams = exams?.filter(
    (exam) =>
      new Date(exam.startDate).toDateString() === selectedDate.toDateString(),
  );

  if (assignmentsError || examsError) {
    throw assignmentsError || examsError;
  }

  const isLoading = isLoadingAssignments || isLoadingExams;
  const hasNoEvents =
    (!isLoading &&
      filteredAssignments?.length === 0 &&
      filteredExams?.length === 0) ||
    (selectedTab === 'assignments' && filteredAssignments?.length === 0) ||
    (selectedTab === 'exams' && filteredExams?.length === 0);

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <Sidebar />
      <div className='container m-8 flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold'>Upcoming events</h2>
        <div className='flex flex-row gap-12'>
          <div className='grid w-full gap-4'>
            <Tabs
              defaultValue='all'
              value={selectedTab}
              onValueChange={(value) =>
                setSelectedTab(value as typeof selectedTab)
              }
            >
              <TabsList>
                <TabsTrigger value='all'>All Events</TabsTrigger>
                <TabsTrigger value='assignments'>Assignments</TabsTrigger>
                <TabsTrigger value='exams'>Exams</TabsTrigger>
              </TabsList>

              <TabsContent value='all' className='grid gap-2'>
                <div className='mt-4 grid gap-2'>
                  {isLoading && (
                    <>
                      <EventCardSkeleton />
                      <EventCardSkeleton />
                    </>
                  )}
                  {!isLoading && hasNoEvents && (
                    <div className='flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center'>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        No events due on {selectedDate.toDateString()}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        Select another date to view events
                      </p>
                    </div>
                  )}
                  {filteredExams?.map((exam) => (
                    <EventCard
                      key={exam.examId}
                      type='exam'
                      name={exam.name}
                      dueTime={exam.startDate}
                      courseName={exam.courseName}
                      courseId={exam.courseId}
                      id={exam.examId}
                      duration={exam.duration}
                    />
                  ))}
                  {filteredAssignments?.map((assignment) => (
                    <EventCard
                      key={assignment.assignmentId}
                      type='assignment'
                      name={assignment.name}
                      dueTime={assignment.dueDate}
                      courseName={assignment.courseName}
                      courseId={assignment.courseId.toString()}
                      id={assignment.assignmentId.toString()}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='assignments' className='grid gap-2'>
                <div className='mt-4 grid gap-2'>
                  {isLoadingAssignments && (
                    <>
                      <EventCardSkeleton />
                      <EventCardSkeleton />
                    </>
                  )}
                  {!isLoadingAssignments &&
                    filteredAssignments?.length === 0 && (
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
                      type='assignment'
                      name={assignment.name}
                      dueTime={assignment.dueDate}
                      courseName={assignment.courseName}
                      courseId={assignment.courseId.toString()}
                      id={assignment.assignmentId.toString()}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='exams'>
                <div className='mt-4 grid gap-2'>
                  {isLoadingExams && (
                    <>
                      <EventCardSkeleton />
                      <EventCardSkeleton />
                    </>
                  )}
                  {!isLoadingExams && filteredExams?.length === 0 && (
                    <div className='flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center'>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        No exams due on {selectedDate.toDateString()}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        Select another date to view exams
                      </p>
                    </div>
                  )}
                  {filteredExams?.map((exam) => (
                    <EventCard
                      key={exam.examId}
                      type='exam'
                      name={exam.name}
                      dueTime={exam.startDate}
                      courseName={exam.courseName}
                      courseId={exam.courseId}
                      id={exam.examId}
                      duration={exam.duration}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
                    <span>{date.getDate()}</span>
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
