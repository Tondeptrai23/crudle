import React, { useState } from 'react';
import { Calendar } from '@/components/common/ui/calendar';

export const WeatherPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <div className='w-72 rounded-md border-2 border-slate-800 text-center'>
        Sidebar
      </div>
      <div className='container m-8 flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold'>Upcoming events</h2>
        <div className='flex flex-row gap-4'>
          <div className='flex-1'>There are no upcoming events.</div>
          <div className=''>
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
                Course ID
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
              >
                Course Name
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
        </table>{' '}
      </div>
    </div>
  );
};
