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
        <h2 className='mb-4 text-2xl font-semibold'>Upcoming events</h2>
        <div className='flex flex-row gap-4'>
          <div className='flex-1'>
            There are no upcoming events.
            {/* Add your events list here */}
          </div>
          <div className=''>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={setSelectedDate}
              className='rounded-md border'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
